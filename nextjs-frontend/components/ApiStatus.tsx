"use client";
// ApiStatus.jsx (UPDATED)
// location: frontend/src/components/ApiStatus.jsx

import React, { useEffect, useState } from "react";

export default function ApiStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/health")
      .then((res) => {
        if (!res.ok) throw new Error("Backend not reachable");
        return res.json();
      })
      .then(() => setStatus("online"))
      .catch(() => setStatus("offline"));
  }, []);

  return (
    <div className="card">
      <h2>Backend Status</h2>
      <p>
        Status:{" "}
        <b style={{ color: status === "online" ? "#22c55e" : "#ef4444" }}>
          {status.toUpperCase()}
        </b>
      </p>
    </div>
  );
}
