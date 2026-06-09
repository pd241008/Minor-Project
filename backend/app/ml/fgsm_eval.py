# backend/app/ml/fgsm_eval.py
# FGSM Evaluation over Multiple Samples

import torch
from app.ml.fgsm import fgsm_attack

def evaluate_fgsm(model, data_loader, epsilon=0.1, max_samples=100):
    clean_correct = 0
    adv_correct = 0
    total = 0

    device = next(model.parameters()).device
    for data, target in data_loader:
        data, target = data.to(device), target.to(device)
        if total >= max_samples:
            break

        data.requires_grad = True
        output = model(data)
        init_pred = output.argmax(dim=1)

        clean_correct += (init_pred == target).sum().item()

        adv_data = fgsm_attack(model, data, target, epsilon)
        adv_output = model(adv_data)
        adv_pred = adv_output.argmax(dim=1)

        adv_correct += (adv_pred == target).sum().item()
        total += target.size(0)

    return clean_correct, adv_correct, total
