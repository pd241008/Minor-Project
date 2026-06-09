from app.ml.models.architecture import TabularMLP
from app.ml.training.trainer import adversarial_train
from app.ml.evaluation.base_eval import evaluate
from app.ml.evaluation.fgsm_eval import evaluate_fgsm
from app.ml.evaluation.ensemble_eval import evaluate_ensemble
from app.core.dependencies import DEVICE

class DefenceService:
    @staticmethod
    def execute_adversarial_training(base_model, train_loader, test_loader, epsilon: float):
        clean_acc = evaluate(model=base_model, data_loader=test_loader)
        
        robust_model = TabularMLP().to(DEVICE)
        robust_model.load_state_dict(base_model.state_dict())
        
        robust_model = adversarial_train(
            model=robust_model,
            train_loader=train_loader,
            epsilon=epsilon,
            epochs=50
        )
        robust_model.eval()

        clean_correct, adv_correct, total = evaluate_fgsm(
            model=robust_model,
            data_loader=test_loader,
            epsilon=epsilon,
            max_samples=100
        )
        robust_acc = adv_correct / total
        improvement = robust_acc - clean_acc

        return {
            "defence_method": "Adversarial Training",
            "epsilon": epsilon,
            "clean_accuracy": round(clean_acc * 100, 2),
            "robust_accuracy": round(robust_acc * 100, 2),
            "improvement": round(improvement * 100, 2)
        }

    @staticmethod
    def execute_ensemble_defence(ensemble_model, test_loader, epsilon: float):
        clean_acc, robust_acc = evaluate_ensemble(
            model=ensemble_model,
            data_loader=test_loader,
            epsilon=epsilon
        )
        improvement = robust_acc - clean_acc

        return {
            "defence_method": "Ensemble Defence",
            "num_models": ensemble_model.num_models,
            "epsilon": epsilon,
            "clean_accuracy": round(clean_acc * 100, 2),
            "robust_accuracy": round(robust_acc * 100, 2),
            "improvement": round(improvement * 100, 2)
        }
