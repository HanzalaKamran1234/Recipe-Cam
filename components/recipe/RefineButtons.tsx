"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GeneratedRecipe, RefineMode } from "@/lib/types";

interface RefineButtonsProps {
  recipe: GeneratedRecipe;
  onRefine: (recipe: GeneratedRecipe) => void;
}

const refinements: { id: RefineMode; label: string; emoji: string; color: string }[] = [
  { id: "healthier", label: "Healthier", emoji: "🥦", color: "from-green-500/20 to-emerald-500/10 border-green-500/30 hover:border-green-400/50" },
  { id: "spicy", label: "Spicy 🌶️", emoji: "🌶️", color: "from-red-500/20 to-orange-500/10 border-red-500/30 hover:border-red-400/50" },
  { id: "vegetarian", label: "Vegetarian", emoji: "🌿", color: "from-emerald-500/20 to-green-500/10 border-emerald-500/30 hover:border-emerald-400/50" },
  { id: "high-protein", label: "High Protein", emoji: "💪", color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30 hover:border-blue-400/50" },
  { id: "budget", label: "Budget", emoji: "💰", color: "from-yellow-500/20 to-amber-500/10 border-yellow-500/30 hover:border-yellow-400/50" },
  { id: "pakistani", label: "Pakistani", emoji: "🇵🇰", color: "from-green-600/20 to-emerald-600/10 border-green-600/30 hover:border-green-500/50" },
  { id: "indian", label: "Indian", emoji: "🇮🇳", color: "from-orange-500/20 to-amber-500/10 border-orange-500/30 hover:border-orange-400/50" },
  { id: "keto", label: "Keto", emoji: "⚡", color: "from-violet-500/20 to-purple-500/10 border-violet-500/30 hover:border-violet-400/50" },
];

export default function RefineButtons({ recipe, onRefine }: RefineButtonsProps) {
  const [loading, setLoading] = useState<RefineMode | null>(null);

  const handleRefine = async (mode: RefineMode) => {
    setLoading(mode);
    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: recipe.title,
          sourceType: "text",
          refineMode: mode,
          existingRecipe: recipe,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      onRefine(data.recipe);
      toast.success(`Recipe refined: ${mode}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Refinement failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-5 rounded-2xl glass border border-white/8">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-orange-400" />
        <h3 className="text-sm font-semibold">Smart Refinement</h3>
        <span className="text-xs text-muted-foreground">— Instantly transform this recipe</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {refinements.map((r) => (
          <motion.button
            key={r.id}
            onClick={() => handleRefine(r.id)}
            disabled={!!loading}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border bg-gradient-to-br transition-all duration-200 disabled:opacity-50 ${r.color}`}
          >
            {loading === r.id ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <span>{r.emoji}</span>
            )}
            {r.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
