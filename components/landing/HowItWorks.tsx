"use client";

import { motion } from "framer-motion";
import { Camera, Cpu, ChefHat } from "lucide-react";

const steps = [
  {
    icon: Camera,
    number: "01",
    title: "Snap or Describe",
    description:
      "Upload a food photo, use your camera, speak the dish name, or just type it. FlavorLens accepts any input.",
    color: "from-orange-500 to-amber-400",
    glow: "group-hover:shadow-orange-500/30",
    details: ["Photo Upload", "Live Camera", "Voice Input", "Text Prompt"],
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI Analyzes",
    description:
      "Gemini 2.5 Flash Vision identifies the dish, detects ingredients, estimates calories, and understands the cuisine.",
    color: "from-violet-500 to-purple-400",
    glow: "group-hover:shadow-violet-500/30",
    details: ["Dish Recognition", "Ingredient Detection", "Nutrition Analysis", "Cuisine Classification"],
  },
  {
    icon: ChefHat,
    number: "03",
    title: "Cook with Confidence",
    description:
      "Get a complete, structured recipe with ingredients, steps, nutrition facts, and expert chef tips — ready in seconds.",
    color: "from-emerald-500 to-teal-400",
    glow: "group-hover:shadow-emerald-500/30",
    details: ["Full Recipe", "Nutrition Data", "Chef's Tips", "Alternative Ingredients"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 relative">
      {/* Section background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Three steps to any recipe
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From photo to full recipe in under 10 seconds. No cooking expertise
            required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group relative p-6 lg:p-8 rounded-2xl glass border border-white/6 hover:border-white/10 transition-all duration-300 hover:shadow-2xl ${step.glow} cursor-default`}
            >
              {/* Step number */}
              <div className="absolute top-6 right-6 text-6xl font-bold text-white/5 select-none">
                {step.number}
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <step.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {step.details.map((detail) => (
                  <span
                    key={detail}
                    className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-muted-foreground"
                  >
                    {detail}
                  </span>
                ))}
              </div>

              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/10 to-transparent z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
