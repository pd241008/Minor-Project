import React from "react";

const features = [
  {
    name: "Adversarial Attacks",
    description: "Launch FGSM and JSMA attacks to identify vulnerabilities in your model structure.",
    icon: "⚡",
    color: "from-red-500/20 to-orange-500/20",
    border: "border-red-500/20"
  },
  {
    name: "Robust Defences",
    description: "Apply adversarial training and ensemble methods to harden your models against perturbations.",
    icon: "🛡️",
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/20"
  },
  {
    name: "Real-time Metrics",
    description: "Monitor confidence drops, accuracy deltas, and performance stats with interactive visualizations.",
    icon: "📊",
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/20"
  }
];

export default function Features() {
  return (
    <div id="features" className="py-24 sm:py-32 border-t border-white/5 bg-black/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-cyan-400">SYSTEM CAPABILITIES</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to secure your AI
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className={`flex flex-col p-8 rounded-2xl bg-gradient-to-b ${feature.color} border ${feature.border} backdrop-blur-sm hover:scale-[1.02] transition-transform cursor-default`}>
                <dt className="text-3xl mb-4">
                  {feature.icon}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col">
                  <p className="text-xl font-bold text-white mb-2">{feature.name}</p>
                  <p className="flex-auto leading-7 text-gray-400">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
