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
    <div className="flex items-center gap-2">
      <span className="font-semibold text-slate-200">Backend Status:</span>
      <b className={`${status === "online" ? "text-green-500" : "text-red-500"}`}>
        {status.toUpperCase()}
      </b>
    </div>
  );
}
