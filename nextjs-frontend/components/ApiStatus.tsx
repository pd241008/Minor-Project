"use client";

import React, { useEffect, useState } from "react";

export default function ApiStatus() {
  const [status, setStatus] = useState<"online" | "offline" | "checking">("checking");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${baseUrl}/health`);
        if (!res.ok) throw new Error();
        setStatus("online");
      } catch {
        setStatus("offline");
      }
    };
    checkStatus();
  }, []);

  return (
    <div className="card">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Backend Status</h2>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${status === 'online' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : status === 'offline' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`}></div>
        <p className="font-bold">
          {status === 'checking' ? 'CHECKING...' : status.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
