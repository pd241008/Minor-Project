import torch
import torch.nn.functional as F


def fgsm_attack(model, image, label, epsilon):

    image = image.clone().detach().requires_grad_(True)

    # Forward
    output = model(image)
    loss = F.cross_entropy(output, label)

    # Backward
    model.zero_grad()
    loss.backward()

    data_grad = image.grad.detach()

    # ✅ Scale epsilon for normalized data
    epsilon = epsilon / 0.3081

    # FGSM
    perturbed = image + epsilon * data_grad.sign()

    # ✅ Correct clamp for normalized MNIST
    min_val = (0 - 0.1307) / 0.3081
    max_val = (1 - 0.1307) / 0.3081

    perturbed = torch.clamp(perturbed, min_val, max_val)

    return perturbed.detach()