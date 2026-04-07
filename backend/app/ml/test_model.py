import torch
from app.ml.evaluate import evaluate
from app.ml.data import get_test_loader
from app.ml.model import SimpleCNN

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model
model = SimpleCNN().to(DEVICE)
model.load_state_dict(torch.load("app/ml/model.pth", map_location=DEVICE))
model.eval()

# Load test data
test_loader = get_test_loader()

# Evaluate
accuracy = evaluate(model, test_loader)

print(f"✅ Clean Accuracy: {accuracy:.4f}")