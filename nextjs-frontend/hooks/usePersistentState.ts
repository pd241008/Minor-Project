"use client";
import { useState, useEffect } from "react";

export default function usePersistentState<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  // Load from localStorage only on the client after initial hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Error reading localStorage", e);
    }
  }, [key]);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn("Error setting localStorage", e);
    }
  }, [key, state]);

  return [state, setState];
}