from prometheus_client import Counter, Gauge

# Attack metrics
fgsm_attack_count = Counter(
    "fgsm_attack_total",
    "Total number of FGSM attacks executed"
)

jsma_attack_count = Counter(
    "jsma_attack_total",
    "Total number of JSMA attacks executed"
)

pgd_attack_count = Counter(
    "pgd_attack_total",
    "Total number of PGD attacks executed"
)

# Accuracy metrics
clean_accuracy = Gauge(
    "model_clean_accuracy",
    "Model accuracy on clean data"
)

adversarial_accuracy = Gauge(
    "model_adversarial_accuracy",
    "Model accuracy under attack"
)

robust_accuracy = Gauge(
    "model_robust_accuracy",
    "Model accuracy after defence"
)
