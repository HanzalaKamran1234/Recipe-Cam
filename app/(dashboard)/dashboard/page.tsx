"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Mic, Type, Upload } from "lucide-react";
import UploadZone from "@/components/upload/UploadZone";
import VoiceInput from "@/components/upload/VoiceInput";
import TextInput from "@/components/upload/TextInput";
import RecipeDetail from "@/components/recipe/RecipeDetail";
import { GeneratedRecipe } from "@/lib/types";

type Tab = "photo" | "voice" | "text";

const tabs: { id: Tab; label: string; icon: typeof Upload }[] = [
  { id: "photo", label: "Photo", icon: Camera },
  { id: "voice", label: "Voice", icon: Mic },
  { id: "text", label: "Text", icon: Type },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("photo");
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);
  const [recipeId, setRecipeId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleRecipeGenerated = (r: GeneratedRecipe, id?: string) => {
    setRecipe(r);
    setRecipeId(id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Generate a <span className="gradient-text">Recipe</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload a food photo, use your voice, or describe a dish to get a complete AI recipe.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div>
          <div className="p-6 rounded-2xl glass border border-white/8">
            {/* Tab switcher */}
            <div className="flex gap-2 mb-6 p-1 rounded-xl bg-white/5">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === id
                      ? "gradient-brand text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "photo" && (
                <motion.div
                  key="photo"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <UploadZone
                    onRecipeGenerated={handleRecipeGenerated}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </motion.div>
              )}
              {activeTab === "voice" && (
                <motion.div
                  key="voice"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="py-4"
                >
                  <VoiceInput
                    onRecipeGenerated={handleRecipeGenerated}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </motion.div>
              )}
              {activeTab === "text" && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <TextInput
                    onRecipeGenerated={handleRecipeGenerated}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Recipe output */}
        <div className="overflow-y-auto max-h-[80vh] no-scrollbar">
          <AnimatePresence mode="wait">
            {isLoading && !recipe && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-6 rounded-2xl glass border border-white/8 space-y-4">
                    <div className="h-6 shimmer rounded-lg w-3/4" />
                    <div className="h-4 shimmer rounded-lg w-full" />
                    <div className="h-4 shimmer rounded-lg w-2/3" />
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="h-16 shimmer rounded-xl" />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {recipe && !isLoading && (
              <motion.div
                key="recipe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <RecipeDetail
                  recipe={recipe}
                  recipeId={recipeId}
                  onRefine={(r) => setRecipe(r)}
                />
              </motion.div>
            )}

            {!recipe && !isLoading && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64 text-center gap-4 p-6 rounded-2xl glass border border-white/8 border-dashed"
              >
                <div className="text-5xl">🍽️</div>
                <div>
                  <p className="font-semibold">Your recipe will appear here</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use any input method on the left to generate a recipe
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
