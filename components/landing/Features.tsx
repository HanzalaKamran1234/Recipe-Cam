"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Mic,
  Wand2,
  Heart,
  Bookmark,
  Share2,
  BarChart3,
  Printer,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Vision AI Analysis",
    description:
      "Gemini 2.5 Flash Vision identifies any dish from a photo with 98%+ accuracy.",
    size: "large",
    gradient: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: Mic,
    title: "Voice to Recipe",
    description:
      'Say "Chicken tikka masala" and get a full recipe in seconds.',
    size: "small",
    gradient: "from-violet-500/15 to-purple-500/5",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Wand2,
    title: "Smart Refinement",
    description: "Transform recipes: make it keto, vegetarian, high-protein, spicy, or Pakistani-style.",
    size: "small",
    gradient: "from-pink-500/15 to-rose-500/5",
    border: "border-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: BarChart3,
    title: "Full Nutrition Breakdown",
    description: "Calories, protein, carbs, fat, fiber, sugar, sodium — all calculated per serving.",
    size: "small",
    gradient: "from-emerald-500/15 to-teal-500/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Heart,
    title: "Chef's Tips & Alternatives",
    description: "Pro tips and ingredient substitutions for every recipe.",
    size: "small",
    gradient: "from-red-500/15 to-orange-500/5",
    border: "border-red-500/20",
    iconColor: "text-red-400",
  },
  {
    icon: Bookmark,
    title: "Save & Organize",
    description: "Bookmark recipes into collections and access your full history.",
    size: "small",
    gradient: "from-blue-500/15 to-cyan-500/5",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Share2,
    title: "Share & Export",
    description: "Share recipe links or export as beautiful printable cards.",
    size: "small",
    gradient: "from-teal-500/15 to-green-500/5",
    border: "border-teal-500/20",
    iconColor: "text-teal-400",
  },
  {
    icon: Globe,
    title: "180+ Cuisines",
    description: "Italian, Pakistani, Japanese, Mexican, Indian, and more.",
    size: "small",
    gradient: "from-amber-500/15 to-yellow-500/5",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Printer,
    title: "Printable Cards",
    description: "Beautiful recipe cards ready to print or save as PDF.",
    size: "small",
    gradient: "from-purple-500/15 to-violet-500/5",
    border: "border-purple-500/20",
    iconColor: "text-purple-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Everything you need to cook smarter
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            FlavorLens is packed with AI-powered features that make cooking
            effortless and fun.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Large feature card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className={`lg:col-span-2 lg:row-span-2 p-8 rounded-2xl bg-gradient-to-br ${features[0].gradient} border ${features[0].border} group hover:scale-[1.01] transition-all duration-300 cursor-default relative overflow-hidden`}
          >
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-orange-500/5 blur-2xl" />
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300`}
            >
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{features[0].title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {features[0].description}
            </p>
            <div className="flex flex-wrap gap-2">
              {["Image Recognition", "Ingredient Detection", "Calorie Estimation", "Cuisine ID"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-medium"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Small feature cards */}
          {features.slice(1).map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * (i + 1) }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border ${feature.border} group hover:scale-[1.02] transition-all duration-300 cursor-default`}
            >
              <div className={`${feature.iconColor} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
