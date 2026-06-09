from fastapi import APIRouter, Depends
from app.schemas.defence import EpsilonRequest
from app.services.defence_service import DefenceService
from app.core.dependencies import get_model, get_ensemble, get_train_data, get_test_data

router = APIRouter()

@router.post("/adversarial-training")
def adversarial_training_defence(
    req: EpsilonRequest,
    base_model=Depends(get_model),
    train_loader=Depends(get_train_data),
    test_loader=Depends(get_test_data)
):
    return DefenceService.execute_adversarial_training(base_model, train_loader, test_loader, req.epsilon)

@router.post("/ensemble")
def ensemble_defence(
    req: EpsilonRequest,
    ensemble_model=Depends(get_ensemble),
    test_loader=Depends(get_test_data)
):
    return DefenceService.execute_ensemble_defence(ensemble_model, test_loader, req.epsilon)
