import torch
from app.ml.models.architecture import TabularMLP
from app.ml.models.ensemble import EnsembleModel
from app.ml.data.loader import get_train_loader, get_test_loader

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

_base_model = None
_ensemble_model = None
_train_loader = None
_test_loader = None

def load_resources():
    global _base_model, _ensemble_model, _train_loader, _test_loader
    
    _base_model = TabularMLP().to(DEVICE)
    _base_model.load_state_dict(torch.load("app/ml/model.pth", map_location=DEVICE, weights_only=True))
    _base_model.eval()

    _ensemble_model = EnsembleModel(num_models=3)
    
    _train_loader = get_train_loader()
    _test_loader = get_test_loader()

def get_model() -> TabularMLP:
    if _base_model is None:
        raise RuntimeError("Model not loaded")
    return _base_model

def get_ensemble() -> EnsembleModel:
    if _ensemble_model is None:
        raise RuntimeError("Ensemble not loaded")
    return _ensemble_model

def get_train_data():
    if _train_loader is None:
        raise RuntimeError("Train loader not initialized")
    return _train_loader

def get_test_data():
    if _test_loader is None:
        raise RuntimeError("Test loader not initialized")
    return _test_loader
