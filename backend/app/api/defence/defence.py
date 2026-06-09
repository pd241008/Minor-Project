from fastapi import APIRouter
from pydantic import BaseModel
import torch

from app.ml.model import TabularMLP
from app.ml.data import get_train_loader, get_test_loader
from app.ml.train import adversarial_train
from app.ml.evaluate import evaluate
from app.ml.fgsm_eval import evaluate_fgsm
from app.ml.ensemble import EnsembleModel
from app.ml.ensemble_eval import evaluate_ensemble


# =====================================================
# ROUTER INIT
# =====================================================
defence_router = APIRouter()

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {DEVICE}")


# =====================================================
# REQUEST MODEL
# =====================================================
class EpsilonRequest(BaseModel):
    epsilon: float


# =====================================================
# LOAD BASE MODEL (ONLY ONCE)
# =====================================================
print("Loading base model...")

base_model = TabularMLP().to(DEVICE)

base_model.load_state_dict(
    torch.load(
        "app/ml/model.pth",
        map_location=DEVICE
    )
)

base_model.eval()

print("✅ Base model loaded")


# =====================================================
# LOAD DATASETS (ONLY ONCE)
# =====================================================
print("Loading datasets...")

train_loader = get_train_loader()
test_loader = get_test_loader()

print("✅ Data loaded")


# =====================================================
# LOAD ENSEMBLE MODELS (ONLY ONCE)
# =====================================================
print("Loading ensemble models...")

ensemble_model = EnsembleModel(num_models=3)

print("✅ Ensemble models loaded")


# =====================================================
# DEFENCE 1: ADVERSARIAL TRAINING
# =====================================================
@defence_router.post("/adversarial-training")
def adversarial_training_defence(req: EpsilonRequest):

    epsilon = req.epsilon

    print("\n🛡 Adversarial Training Defence")
    print("EPSILON:", epsilon)

    # -------------------------
    # BASELINE CLEAN ACCURACY
    # -------------------------
    clean_acc = evaluate(
        model=base_model,
        data_loader=test_loader
    )

    # -------------------------
    # CLONE MODEL
    # -------------------------
    robust_model = TabularMLP().to(DEVICE)

    robust_model.load_state_dict(
        base_model.state_dict()
    )

    # -------------------------
    # ADVERSARIAL TRAINING
    # -------------------------
    robust_model = adversarial_train(
        model=robust_model,
        train_loader=train_loader,
        epsilon=epsilon,
        epochs=3
    )

    robust_model.eval()

    # -------------------------
    # ROBUST ACCURACY (FGSM)
    # -------------------------
    clean_correct, adv_correct, total = evaluate_fgsm(
        model=robust_model,
        data_loader=test_loader,
        epsilon=epsilon,
        max_samples=100
    )

    robust_acc = adv_correct / total

    improvement = robust_acc - clean_acc

    print(f"Clean Accuracy: {clean_acc:.4f}")
    print(f"Robust Accuracy: {robust_acc:.4f}")

    return {
        "defence_method": "Adversarial Training",
        "epsilon": epsilon,
        "clean_accuracy": round(clean_acc * 100, 2),
        "robust_accuracy": round(robust_acc * 100, 2),
        "improvement": round(improvement * 100, 2)
    }


# =====================================================
# DEFENCE 2: ENSEMBLE DEFENCE
# =====================================================
@defence_router.post("/ensemble")
def ensemble_defence(req: EpsilonRequest):

    epsilon = req.epsilon

    print("\n🛡 Ensemble Defence")
    print("EPSILON:", epsilon)

    clean_acc, robust_acc = evaluate_ensemble(
        model=ensemble_model,
        data_loader=test_loader,
        epsilon=epsilon
    )

    improvement = robust_acc - clean_acc

    print(f"Clean Accuracy: {clean_acc:.4f}")
    print(f"Robust Accuracy: {robust_acc:.4f}")

    return {
        "defence_method": "Ensemble Defence",
        "num_models": 3,
        "epsilon": epsilon,
        "clean_accuracy": round(clean_acc * 100, 2),
        "robust_accuracy": round(robust_acc * 100, 2),
        "improvement": round(improvement * 100, 2)
    }