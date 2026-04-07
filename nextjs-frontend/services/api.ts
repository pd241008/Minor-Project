// services/api.ts
import { FGSMResult, JSMAResult, DefenceResult } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function post<T>(endpoint: string, body: Record<string, any> = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Typed wrapper functions
export const runFGSM = (epsilon: number) => post<FGSMResult>("/attack/fgsm", { epsilon });
export const runJSMA = () => post<JSMAResult>("/attack/jsma");
export const runDefence = (type: string, epsilon: number) => 
  post<DefenceResult>(`/defence/${type}`, { epsilon });
