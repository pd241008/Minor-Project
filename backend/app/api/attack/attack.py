from fastapi import APIRouter
import torch
from pydantic import BaseModel
from app.ml.model import SimpleCNN
from app.ml.data import get_test_loader
from app.ml.fgsm_eval import evaluate_fgsm
from app.ml.jsma_eval import evaluate_jsma

from app.monitoring.metrics import (
    fgsm_attack_count,
    jsma_attack_count,
    pgd_attack_count,
    clean_accuracy,
    adversarial_accuracy
)

attack_router = APIRouter()

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ✅ Load trained model
model = SimpleCNN().to(DEVICE)
model.load_state_dict(torch.load("app/ml/model.pth", map_location=DEVICE))
model.eval()

# ✅ Correct loader
test_loader = get_test_loader()
class FGSMRequest(BaseModel):
    epsilon: float

class PGDRequest(BaseModel):
    epsilon: float = 0.1
    alpha: float = 0.01
    steps: int = 40


# -----------------------------
# FGSM ATTACK
# -----------------------------
@attack_router.post("/fgsm")
def fgsm_multi_sample(req: FGSMRequest):

    epsilon = req.epsilon
    clean_correct, adv_correct, total = evaluate_fgsm(
        model,
        test_loader,
        epsilon=epsilon,
        max_samples=100
    )

    clean_acc = clean_correct / total
    adv_acc = adv_correct / total

    fgsm_attack_count.inc()
    clean_accuracy.set(clean_acc)
    adversarial_accuracy.set(adv_acc)
    drop = (clean_acc - adv_acc) / clean_acc

    return {
    "attack_type": "FGSM",
    "epsilon": epsilon,

    "original_accuracy": round(clean_acc * 100, 1),
    "adversarial_accuracy": round(adv_acc * 100, 1),

    # ✅ NEW FORMAT
    "accuracy_transition": f"{round(clean_acc*100,1)}% → {round(adv_acc*100,1)}%",
    "relative_drop": round(drop * 100, 1)
}


# -----------------------------
# JSMA ATTACK
# -----------------------------
@attack_router.post("/jsma")
def jsma_multi_sample(theta: float = 0.4):

    clean_correct, adv_correct, total, avg_perturb, conf_drop = evaluate_jsma(
        model,
        test_loader,
        theta=theta,
        max_samples=50
    )

    clean_acc = clean_correct / total
    adv_acc = adv_correct / total

    jsma_attack_count.inc()
    clean_accuracy.set(clean_acc)
    adversarial_accuracy.set(adv_acc)

    return {
        "attack_type": "JSMA",
        "theta": theta,
        "samples": total,

        "clean_accuracy": round(clean_acc, 3),
        "adversarial_accuracy": round(adv_acc, 3),

        # ✅ Correct metric
        "confidence_drop": round(conf_drop, 3),

        # ✅ Correct perturbation metric
        "perturbed_features": avg_perturb
    }

# -----------------------------
# PGD ATTACK
# -----------------------------
from app.ml.pgd_eval import evaluate_pgd

@attack_router.post("/pgd")
def pgd_multi_sample(req: PGDRequest):
    clean_correct, adv_correct, total = evaluate_pgd(
        model,
        test_loader,
        epsilon=req.epsilon,
        alpha=req.alpha,
        steps=req.steps,
        max_samples=100
    )

    clean_acc = clean_correct / total
    adv_acc = adv_correct / total

    pgd_attack_count.inc()
    clean_accuracy.set(clean_acc)
    adversarial_accuracy.set(adv_acc)
    drop = (clean_acc - adv_acc) / clean_acc

    return {
        "attack_type": "PGD",
        "epsilon": req.epsilon,
        "alpha": req.alpha,
        "steps": req.steps,
        "original_accuracy": round(clean_acc * 100, 1),
        "adversarial_accuracy": round(adv_acc * 100, 1),
        "accuracy_transition": f"{round(clean_acc*100,1)}% → {round(adv_acc*100,1)}%",
        "relative_drop": round(drop * 100, 1),
        "success_rate": round((clean_acc - adv_acc) * 100, 1)
    }