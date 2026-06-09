from app.ml.evaluation.fgsm_eval import evaluate_fgsm
from app.ml.evaluation.jsma_eval import evaluate_jsma
from app.ml.evaluation.pgd_eval import evaluate_pgd
from app.ml.data.loader import CONTINUOUS_COLS, CATEGORICAL_GROUPS
from app.monitoring.metrics import (
    fgsm_attack_count,
    jsma_attack_count,
    pgd_attack_count,
    clean_accuracy,
    adversarial_accuracy
)

class AttackService:
    @staticmethod
    def execute_fgsm(model, test_loader, epsilon: float):
        clean_correct, adv_correct, total = evaluate_fgsm(
            model, test_loader, epsilon=epsilon, max_samples=100
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
            "accuracy_transition": f"{round(clean_acc*100,1)}% → {round(adv_acc*100,1)}%",
            "relative_drop": round(drop * 100, 1)
        }

    @staticmethod
    def execute_jsma(model, test_loader, theta: float):
        clean_correct, adv_correct, total, avg_perturb, conf_drop = evaluate_jsma(
            model, test_loader, theta=theta, max_samples=50
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
            "confidence_drop": round(conf_drop, 3),
            "perturbed_features": avg_perturb
        }

    @staticmethod
    def execute_pgd(model, test_loader, epsilon: float, alpha: float, steps: int):
        clean_correct, adv_correct, total = evaluate_pgd(
            model, test_loader, epsilon=epsilon, alpha=alpha, steps=steps,
            max_samples=100, continuous_cols=CONTINUOUS_COLS, categorical_groups=CATEGORICAL_GROUPS
        )

        clean_acc = clean_correct / total
        adv_acc = adv_correct / total

        pgd_attack_count.inc()
        clean_accuracy.set(clean_acc)
        adversarial_accuracy.set(adv_acc)
        drop = (clean_acc - adv_acc) / clean_acc

        return {
            "attack_type": "PGD",
            "epsilon": epsilon,
            "alpha": alpha,
            "steps": steps,
            "original_accuracy": round(clean_acc * 100, 1),
            "adversarial_accuracy": round(adv_acc * 100, 1),
            "accuracy_transition": f"{round(clean_acc*100,1)}% → {round(adv_acc*100,1)}%",
            "relative_drop": round(drop * 100, 1),
            "success_rate": round((clean_acc - adv_acc) * 100, 1)
        }
