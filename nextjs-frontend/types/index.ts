// types/index.ts

export interface FGSMResult {
  original_accuracy: number;
  adversarial_accuracy: number;
  epsilon: number;
}

export interface JSMAResult {
  perturbed_features: number;
  confidence_drop: number;
}

export interface DefenceResult {
  defence_method: string;
  robust_accuracy: number;
  status: string;
}

export interface LogEntry {
  type: string;
  metric: string;
  value: string | number;
  epsilon: number;
  time: string;
}

// Props for panels
export interface PanelProps {
  setIsLoading: (loading: boolean) => void;
  setLoadingMsg: (msg: string) => void;
  epsilonGlobal: number;
  setEpsilonGlobal?: (val: number) => void;
}
