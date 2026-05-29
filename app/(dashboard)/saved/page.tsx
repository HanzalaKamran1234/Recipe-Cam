"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Clock, ChefHat, Flame } from "lucide-react";
import Link from "next/link";
import { formatTime } from "@/lib/utils";

interface SavedRecipe {
  id: string;
  createdAt: string;
  recipe: {
    id: string;
    title: string;
    cuisine: string;
    difficulty: string;
    prepTime: number;
    cookTime: number;
    calories: number;
  };
}

export default function SavedPage() {
  const [saved, setSaved] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/save-recipe")
      .then((r) => r.json())
      .then((d) => setSaved(d.saved || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Saved <span className="gradient-text">Recipes</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Your bookmarked recipes, always at hand.
        </p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-5 rounded-2xl glass border border-white/8 space-y-3">
              <div className="h-5 shimmer rounded-lg w-3/4" />
              <div className="h-4 shimmer rounded-lg w-1/2" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-12 shimmer rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
            <Bookmark className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold">No saved recipes yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Generate a recipe and bookmark it to see it here.
            </p>
          </div>
          <Link href="/dashboard" className="px-6 py-2.5 gradient-brand text-white text-sm font-medium rounded-xl shadow-lg shadow-orange-500/20 hover:opacity-90 transition-opacity">
            Generate a Recipe
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="group p-5 rounded-2xl glass border border-white/8 hover:border-orange-500/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-sm group-hover:gradient-text transition-all line-clamp-2">
                  {s.recipe.title}
                </h3>
                <Bookmark className="w-4 h-4 text-orange-400 flex-shrink-0 ml-2 fill-orange-400" />
              </div>
              <p className="text-xs text-muted-foreground mb-3">{s.recipe.cuisine}</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Clock, value: formatTime(s.recipe.prepTime + s.recipe.cookTime), label: "Total" },
                  { icon: ChefHat, value: s.recipe.difficulty, label: "Level" },
                  { icon: Flame, value: `${s.recipe.calories}`, label: "Cal" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex flex-col items-center py-2 rounded-lg bg-white/5 text-center">
                    <Icon className="w-3.5 h-3.5 text-orange-400 mb-1" />
                    <span className="text-xs font-semibold">{value}</span>
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
