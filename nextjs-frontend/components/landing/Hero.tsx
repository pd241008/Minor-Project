"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative isolate pt-14 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-gradient-to-r from-cyan-400 via-white to-purple-500 bg-clip-text text-transparent">
              Adversarial ML <br /> Evaluation Framework
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Battle-test your neural networks with state-of-the-art adversarial attacks and robust defence mechanisms. Secure your intelligence.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:from-cyan-500 hover:to-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-all transform hover:scale-105"
              >
                ENTER DASHBOARD
              </Link>
              <a href="#features" className="text-sm font-semibold leading-6 text-white group">
                Learn more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          <div className="mt-16 flow-root sm:mt-24">
            <div className="relative -m-2 rounded-xl bg-gray-900/50 p-2 ring-1 ring-inset ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4 backdrop-blur-xl">
               <div className="bg-black/40 rounded-lg p-8 border border-white/5 min-h-[300px] flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150"></div>
                    </div>
                    <p className="font-mono text-cyan-400 text-sm italic">{"[ SYSTEM STATUS: ENCRYPTED ]"}</p>
                    <p className="text-gray-500 font-mono text-xs">Awaiting primary tensor ingestion...</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
