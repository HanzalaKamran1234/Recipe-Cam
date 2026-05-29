"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History, Clock, ChefHat, Flame, Camera, Mic, Type } from "lucide-react";
import Link from "next/link";
import { formatTime } from "@/lib/utils";

interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  calories: number;
  sourceType: string;
  createdAt: string;
}

const sourceIcon = {
  image: Camera,
  voice: Mic,
  text: Type,
};

export default function HistoryPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recipes")
      .then((r) => r.json())
      .then((d) => setRecipes(d.recipes || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Recipe <span className="gradient-text">History</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          All your AI-generated recipes in one place.
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 rounded-2xl glass border border-white/8 flex items-center gap-4">
              <div className="w-10 h-10 shimmer rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 shimmer rounded w-2/3" />
                <div className="h-3 shimmer rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
            <History className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold">No recipes yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Generate your first recipe to see it here.
            </p>
          </div>
          <Link href="/dashboard" className="px-6 py-2.5 gradient-brand text-white text-sm font-medium rounded-xl shadow-lg shadow-orange-500/20 hover:opacity-90 transition-opacity">
            Generate a Recipe
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {recipes.map((recipe, i) => {
            const SrcIcon = sourceIcon[recipe.sourceType as keyof typeof sourceIcon] || Type;
            return (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-center gap-4 p-4 rounded-2xl glass border border-white/8 hover:border-orange-500/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/20">
                  <SrcIcon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm group-hover:text-orange-400 transition-colors truncate">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {recipe.cuisine} · {new Date(recipe.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground flex-shrink-0">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(recipe.prepTime + recipe.cookTime)}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="w-3 h-3" />
                    {recipe.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    {recipe.calories} cal
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
