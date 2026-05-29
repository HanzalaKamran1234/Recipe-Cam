"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import {
  ArrowRight,
  Camera,
  Mic,
  Sparkles,
  ChefHat,
  Zap,
} from "lucide-react";

const floatingItems = [
  { emoji: "🍕", x: "8%", y: "20%", delay: 0, size: "text-3xl" },
  { emoji: "🍜", x: "88%", y: "15%", delay: 0.5, size: "text-2xl" },
  { emoji: "🥗", x: "5%", y: "70%", delay: 1, size: "text-2xl" },
  { emoji: "🍣", x: "92%", y: "65%", delay: 1.5, size: "text-3xl" },
  { emoji: "🍔", x: "15%", y: "45%", delay: 0.8, size: "text-2xl" },
  { emoji: "🧁", x: "82%", y: "40%", delay: 1.2, size: "text-2xl" },
  { emoji: "🥘", x: "50%", y: "88%", delay: 0.3, size: "text-2xl" },
];

const stats = [
  { label: "Recipes Generated", value: "500K+" },
  { label: "Happy Chefs", value: "50K+" },
  { label: "Cuisines Supported", value: "180+" },
  { label: "AI Accuracy", value: "98.7%" },
];

export default function Hero() {
  const { isSignedIn } = useAuth();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 grid-bg">
      {/* Gradient background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-red-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-amber-500/8 rounded-full blur-[80px]" />
      </div>

      {/* Floating food emojis */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} select-none pointer-events-none hidden lg:block`}
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: 1,
            y: [0, -15, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
            scale: { delay: item.delay, duration: 0.5 },
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-500/20 mb-8"
      >
        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
        <span className="text-xs font-medium text-orange-300">
          Powered by Gemini 2.5 Flash Vision AI
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-center max-w-4xl mx-auto px-4"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-foreground">Snap.</span>{" "}
          <span className="gradient-text glow-text">Analyze.</span>{" "}
          <span className="text-foreground">Cook.</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Upload any food photo and FlavorLens AI instantly generates a{" "}
          <span className="text-foreground font-medium">complete recipe</span> —
          ingredients, steps, calories, nutrition, and chef&apos;s tips. Powered
          by Gemini Vision.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-10 px-4"
      >
        {isSignedIn ? (
          <Link
            href="/dashboard"
            className="group flex items-center gap-3 px-8 py-4 gradient-brand text-white font-semibold rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
          >
            <Zap className="w-5 h-5" />
            Open Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <>
            <SignUpButton mode="modal">
              <button className="group flex items-center gap-3 px-8 py-4 gradient-brand text-white font-semibold rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300">
                <Zap className="w-5 h-5" />
                Start for Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignUpButton>
            <Link
              href="/#demo"
              className="flex items-center gap-2 px-8 py-4 glass border border-white/10 text-foreground font-semibold rounded-2xl hover:bg-white/5 transition-all duration-300"
            >
              <Camera className="w-4 h-4" />
              Try Live Demo
            </Link>
          </>
        )}
      </motion.div>

      {/* Input modes badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mt-6 px-4"
      >
        {[
          { icon: Camera, label: "Photo Upload" },
          { icon: Mic, label: "Voice Input" },
          { icon: ChefHat, label: "Text Description" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs text-muted-foreground"
          >
            <Icon className="w-3 h-3 text-orange-400" />
            {label}
          </div>
        ))}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-16 px-4 max-w-3xl w-full"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="text-center"
          >
            <div className="text-2xl sm:text-3xl font-bold gradient-text">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {!isSignedIn && (
            <SignUpButton mode="modal">
              <button className="w-full flex items-center justify-center gap-2 py-4 gradient-brand text-white font-semibold rounded-2xl shadow-2xl shadow-orange-500/40">
                <Zap className="w-4 h-4" />
                Get Started Free — Snap Your First Recipe
              </button>
            </SignUpButton>
          )}
        </motion.div>
      </div>
    </section>
  );
}
