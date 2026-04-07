def attack_success_rate(original_acc, adversarial_acc):
    return round((original_acc - adversarial_acc) / original_acc, 3)


def robustness_score(clean_acc, adv_acc):
    return round(adv_acc / clean_acc, 3)
