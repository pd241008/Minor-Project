import torch
import torch.nn as nn

def pgd_attack(model, images, labels, epsilon=0.1, alpha=0.01, steps=40):
    images = images.clone().detach()
    labels = labels.clone().detach()
    loss = nn.CrossEntropyLoss()
    
    ori_images = images.data
    
    for i in range(steps):
        images.requires_grad = True
        outputs = model(images)
        
        model.zero_grad()
        cost = loss(outputs, labels)
        cost.backward()
        
        adv_images = images + alpha * images.grad.sign()
        eta = torch.clamp(adv_images - ori_images, min=-epsilon, max=epsilon)
        images = torch.clamp(ori_images + eta, min=0, max=1).detach_()
        
    return images
