from fastapi import APIRouter, Depends
from app.schemas.attack import FGSMRequest, PGDRequest
from app.services.attack_service import AttackService
from app.core.dependencies import get_model, get_test_data

router = APIRouter()

@router.post("/fgsm")
def fgsm_multi_sample(
    req: FGSMRequest,
    model=Depends(get_model),
    test_loader=Depends(get_test_data)
):
    return AttackService.execute_fgsm(model, test_loader, req.epsilon)

@router.post("/jsma")
def jsma_multi_sample(
    theta: float = 0.4,
    model=Depends(get_model),
    test_loader=Depends(get_test_data)
):
    return AttackService.execute_jsma(model, test_loader, theta)

@router.post("/pgd")
def pgd_multi_sample(
    req: PGDRequest,
    model=Depends(get_model),
    test_loader=Depends(get_test_data)
):
    return AttackService.execute_pgd(model, test_loader, req.epsilon, req.alpha, req.steps)
