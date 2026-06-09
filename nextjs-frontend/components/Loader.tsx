"use client";
import React from "react";
// Go up one level from 'components', then into 'styles'
import "../styles/Loader.css";

export default function Loader({ message = "Processing..." }: any) {
  return (
    <div className="loader-overlay">
      {/* Visual Indicator */}
      <div className="heartbeat-node"></div>

      {/* Text Context */}
      <h3 className="loader-title">{message}</h3>
      <p className="loader-subtitle">
        Please wait while the backend computes tensors...
      </p>
    </div>
  );
}
