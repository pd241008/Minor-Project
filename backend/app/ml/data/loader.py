# backend/app/ml/data.py
import torch
from torch.utils.data import TensorDataset, DataLoader
import os

# Example Feature Topology for NSL-KDD
# Features 0-3: Continuous (e.g., duration, src_bytes, dst_bytes, wrong_fragment)
# Features 4-6: Categorical Protocol (TCP, UDP, ICMP) -> One-Hot
# Features 7-17: Categorical Service (11 common services) -> One-Hot

CONTINUOUS_COLS = [0, 1, 2, 3]
CATEGORICAL_GROUPS = [
    [4, 5, 6],         # Protocol Type
    list(range(7, 18)) # Service Type
]
FEATURE_DIM = 18

def load_tabular_data(csv_path, samples=1000):
    """
    Attempts to load a CSV, otherwise falls back to a structurally accurate 
    synthetic tabular dataset conforming to the continuous and DACM boundaries.
    """
    if os.path.exists(csv_path):
        import numpy as np
        data = np.loadtxt(csv_path, delimiter=',')
        x_data = torch.tensor(data[:, :-1], dtype=torch.float32)
        y_data = torch.tensor(data[:, -1], dtype=torch.long)
        print(f"Label distribution for {csv_path}:", torch.bincount(y_data.long()))
        return TensorDataset(x_data, y_data)
        
    print(f"WARNING: {csv_path} not found. Falling back to synthetic.")
    # Synthetic generator strictly conforming to Min-Max [0, 1] and One-Hot bounds
    x_data = torch.rand(samples, FEATURE_DIM)
    
    # Enforce one-hot Euclidean structures on categorical groups
    for group in CATEGORICAL_GROUPS:
        indices = torch.randint(0, len(group), (samples,))
        one_hot = torch.nn.functional.one_hot(indices, num_classes=len(group)).float()
        x_data[:, group] = one_hot
        
    y_data = torch.randint(0, 2, (samples,))
    
    print(f"Label distribution for {csv_path}:", torch.bincount(y_data.long()))
    
    return TensorDataset(x_data, y_data)

def get_train_loader(batch_size=64):
    dataset = load_tabular_data("./data/nsl-kdd-train.csv", samples=5000)
    return DataLoader(dataset, batch_size=batch_size, shuffle=True)

def get_test_loader(batch_size=1000):
    dataset = load_tabular_data("./data/nsl-kdd-test.csv", samples=1000)
    return DataLoader(dataset, batch_size=batch_size, shuffle=False)