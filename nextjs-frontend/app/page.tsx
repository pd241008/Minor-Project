import React from "react";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-[#0b0f19] min-h-screen text-white selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-lg">
              A
            </div>
            <span className="font-bold tracking-tight text-xl">ADVERSARIAL.AI</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
            <Link 
              href="/dashboard" 
              className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Features />
        
        {/* Footer CTA */}
        <section className="py-24 border-t border-white/5 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to secure your models?</h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 rounded-full bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all shadow-[0_0_30px_rgba(8,145,178,0.3)]"
          >
            Get Started Now
          </Link>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>© 2026 Adversarial Evaluation Framework. Built for robust machine learning.</p>
      </footer>
    </div>
  );
}
