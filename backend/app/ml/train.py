import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.optim import Adam
import random

from app.ml.model import TabularMLP
from app.ml.data import get_train_loader
from app.ml.fgsm import fgsm_attack

# Device
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# =====================================================
# ✅ CLEAN TRAINING
# =====================================================
def train_model(epochs=5, lr=1e-3, save_path="app/ml/model.pth"):
    model = TabularMLP().to(DEVICE)
    train_loader = get_train_loader()

    optimizer = Adam(model.parameters(), lr=lr)
    criterion = nn.CrossEntropyLoss()

    model.train()

    for epoch in range(epochs):
        total_loss = 0

        for data, target in train_loader:
            data, target = data.to(DEVICE), target.long().view(-1).to(DEVICE)

            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, target)

            loss.backward()
            optimizer.step()

            total_loss += loss.item()

        avg_loss = total_loss / len(train_loader)
        print(f"[Clean Train] Epoch {epoch+1}: Avg Loss = {avg_loss:.4f}")

    torch.save(model.state_dict(), save_path)
    print(f"✅ Model saved at {save_path}")

    return model


# =====================================================
# ✅ ADVERSARIAL TRAINING (FAST + STABLE)
# =====================================================
def adversarial_train(model, train_loader, epsilon=0.1, epochs=2, lr=1e-4):

    model = model.to(DEVICE)
    optimizer = Adam(model.parameters(), lr=lr)

    model.train()

    for epoch in range(epochs):
        total_loss_epoch = 0

        for data, target in train_loader:
            data, target = data.to(DEVICE), target.long().view(-1).to(DEVICE)

            # CLEAN PASS
            output = model(data)
            loss_clean = F.cross_entropy(output, target)

            # ADVERSARIAL EXAMPLES
            adv_data = fgsm_attack(model, data, target, epsilon)

            # ADVERSARIAL PASS
            adv_output = model(adv_data)
            loss_adv = F.cross_entropy(adv_output, target)

            # COMBINED LOSS
            loss = 0.5 * loss_clean + 0.5 * loss_adv

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            total_loss_epoch += loss.item()

        avg_loss = total_loss_epoch / len(train_loader)
        print(f"[Adv Train] Epoch {epoch+1}: Avg Loss = {avg_loss:.4f}")

    model.eval()
    return model


# =====================================================
# 🚀 TRUE ENSEMBLE TRAINING (FIXED PROPERLY)
# =====================================================
def train_multiple_models(num_models=3):

    for i in range(num_models):

        print(f"\n🚀 Training model {i+1}")

        # ✅ Different seeds
        torch.manual_seed(42 + i)
        random.seed(42 + i)

        model = TabularMLP().to(DEVICE)
        train_loader = get_train_loader()

        # ✅ Different LR per model
        lr_list = [1e-3, 5e-4, 1e-4]
        optimizer = Adam(model.parameters(), lr=lr_list[i % len(lr_list)])

        model.train()

        for epoch in range(3):
            total_loss = 0

            for data, target in train_loader:

                data, target = data.to(DEVICE), target.long().view(-1).to(DEVICE)

                # -----------------------------
                # ✅ SAFE NOISE (CLAMPED)
                # -----------------------------
                noise = torch.randn_like(data) * (0.02 * (i + 1))
                data_noisy = data + noise

                # Clamp to normalized Tabular Min-Max range
                min_val = 0.0
                max_val = 1.0
                data_noisy = torch.clamp(data_noisy, min_val, max_val)

                optimizer.zero_grad()

                output = model(data_noisy)
                loss = F.cross_entropy(output, target)

                loss.backward()
                optimizer.step()

                total_loss += loss.item()

            avg_loss = total_loss / len(train_loader)
            print(f"[Model {i+1}] Epoch {epoch+1}: Avg Loss = {avg_loss:.4f}")

        # -----------------------------
        # ✅ SAVE MODEL
        # -----------------------------
        save_path = f"app/ml/model_{i}.pth"
        torch.save(model.state_dict(), save_path)

        print(f"✅ Saved: {save_path}")

    print("\n✅ All ensemble models trained successfully!")


# =====================================================
# ENTRY POINT
# =====================================================
if __name__ == "__main__":
    # 🔥 Use this for ensemble (IMPORTANT)
    train_multiple_models(num_models=3)

    # Optional single model
    # train_model()