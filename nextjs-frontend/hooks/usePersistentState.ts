// hooks/usePersistentState.ts
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    // Check for window to avoid SSR issues
    if (typeof window === "undefined") return initialValue;
    
    const saved = localStorage.getItem(key);
    try {
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}
