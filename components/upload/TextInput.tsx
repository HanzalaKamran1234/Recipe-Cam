"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send } from "lucide-react";
import { toast } from "sonner";
import { GeneratedRecipe } from "@/lib/types";

interface TextInputProps {
  onRecipeGenerated: (recipe: GeneratedRecipe, id?: string) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

const suggestions = [
  "Chicken Biryani",
  "Creamy Pasta",
  "Chocolate Lava Cake",
  "Beef Tacos",
  "Miso Ramen",
  "Butter Chicken",
  "Pad Thai",
  "Greek Salad",
];

export default function TextInput({
  onRecipeGenerated,
  isLoading,
  setIsLoading,
}: TextInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async (text?: string) => {
    const input = text || prompt;
    if (!input.trim()) {
      toast.error("Please enter a dish name or description");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: input,
          sourceType: "text",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate recipe");

      onRecipeGenerated(data.recipe, data.id);
      toast.success("Recipe generated!");
      setPrompt("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate recipe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleGenerate();
            }
          }}
          placeholder="Describe a dish... e.g. 'Spicy chicken tikka masala with garlic naan' or just 'Pasta carbonara'"
          className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-orange-500/50 focus:bg-white/7 transition-all"
          disabled={isLoading}
        />
        <button
          onClick={() => handleGenerate()}
          disabled={isLoading || !prompt.trim()}
          className="absolute bottom-3 right-3 p-2 rounded-lg gradient-brand text-white disabled:opacity-40 hover:opacity-90 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Suggestions */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Popular dishes</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <motion.button
              key={s}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPrompt(s);
                handleGenerate(s);
              }}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-orange-500/20 transition-all disabled:opacity-50"
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        onClick={() => handleGenerate()}
        disabled={isLoading || !prompt.trim()}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 gradient-brand text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all"
      >
        {isLoading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Recipe
          </>
        )}
      </motion.button>
    </div>
  );
}
