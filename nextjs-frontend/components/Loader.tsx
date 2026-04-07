"use client";

import React from "react";

export default function Loader({ message = "Processing..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-t-transparent border-r-cyan-500 border-b-transparent border-l-purple-500 rounded-full animate-spin-slow"></div>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {message}
        </h3>
        <p className="text-gray-400 animate-pulse">
            Executing adversarial compute kernels...
        </p>
      </div>
    </div>
  );
}
