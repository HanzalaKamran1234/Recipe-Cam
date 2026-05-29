"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Camera,
  Mic,
  Type,
  Sparkles,
  X,
  Clock,
  Flame,
  ChefHat,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { GeneratedRecipe } from "@/lib/types";
import { fileToBase64, compressImage } from "@/lib/utils";

const DEMO_RECIPE: GeneratedRecipe = {
  title: "Creamy Chicken Tikka Masala",
  description:
    "A rich, aromatic Indian-inspired dish with tender chicken in a velvety tomato-cream sauce, fragrant with warming spices.",
  cuisine: "Indian",
  difficulty: "Medium",
  prepTime: 20,
  cookTime: 35,
  servings: 4,
  calories: 487,
  ingredients: [
    { name: "Chicken breast", amount: "500", unit: "g", notes: "cut into chunks" },
    { name: "Heavy cream", amount: "200", unit: "ml" },
    { name: "Crushed tomatoes", amount: "400", unit: "g" },
    { name: "Onion", amount: "2", unit: "large" },
    { name: "Garlic cloves", amount: "4", unit: "cloves" },
    { name: "Ginger", amount: "1", unit: "inch piece" },
    { name: "Garam masala", amount: "2", unit: "tsp" },
    { name: "Cumin", amount: "1", unit: "tsp" },
  ],
  instructions: [
    { step: 1, title: "Marinate chicken", description: "Mix yogurt, spices, and chicken. Marinate 30 mins.", duration: "30 min" },
    { step: 2, title: "Cook aromatics", description: "Sauté onions, garlic, ginger until golden.", duration: "8 min" },
    { step: 3, title: "Add spices", description: "Add garam masala, cumin, coriander. Toast 1 minute.", duration: "1 min" },
    { step: 4, title: "Simmer sauce", description: "Add tomatoes, cook until thick. Add cream.", duration: "15 min" },
  ],
  nutrition: {
    calories: 487, protein: 42, carbohydrates: 18, fat: 28, fiber: 3, sugar: 8, sodium: 620,
  },
  tips: [
    { title: "Marinate longer", description: "For deeper flavor, marinate chicken overnight." },
    { title: "Char the chicken", description: "Grill or broil chicken before adding to sauce for smoky flavor." },
  ],
  tags: ["Indian", "Chicken", "Creamy", "Spicy", "Dinner"],
  alternativeIngredients: [
    { original: "Heavy cream", alternatives: ["Coconut milk", "Greek yogurt", "Cashew cream"] },
  ],
};

type InputMode = "upload" | "camera" | "voice" | "text";

export default function LiveDemo() {
  const [mode, setMode] = useState<InputMode>("upload");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [step, setStep] = useState(0); // 0=input, 1=analyzing, 2=result
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    const compressed = await compressImage(file);
    const url = URL.createObjectURL(compressed);
    setPreview(url);
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStep(1);

    // Simulate AI analysis steps
    await new Promise((r) => setTimeout(r, 800));
    setStep(2);
    await new Promise((r) => setTimeout(r, 600));

    // For demo: use the demo recipe
    setRecipe(DEMO_RECIPE);
    setIsGenerating(false);
    toast.success("Recipe generated! Sign up to use the real AI.");
  };

  const modes: { id: InputMode; icon: typeof Upload; label: string }[] = [
    { id: "upload", icon: Upload, label: "Photo" },
    { id: "camera", icon: Camera, label: "Camera" },
    { id: "voice", icon: Mic, label: "Voice" },
    { id: "text", icon: Type, label: "Text" },
  ];

  return (
    <section id="demo" className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Live Demo
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Try FlavorLens now
          </h2>
          <p className="text-muted-foreground text-lg">
            No account needed. See the magic yourself.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl glass border border-white/8 p-6"
          >
            {/* Mode tabs */}
            <div className="flex gap-2 mb-6">
              {modes.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setMode(id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    mode === id
                      ? "gradient-brand text-white shadow-lg shadow-orange-500/20"
                      : "bg-white/5 text-muted-foreground hover:bg-white/8 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Input area */}
            <AnimatePresence mode="wait">
              {mode === "text" ? (
                <motion.div
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Describe your dish... e.g. 'Creamy chicken pasta with sun-dried tomatoes'"
                    className="w-full h-32 bg-white/5 border border-white/8 rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => fileRef.current?.click()}
                  className="relative h-40 rounded-xl border-2 border-dashed border-white/10 hover:border-orange-500/40 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group"
                >
                  {preview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-60"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview(null);
                        }}
                        className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 hover:bg-black/80 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-orange-400 transition-colors" />
                      <p className="text-sm text-muted-foreground">
                        {mode === "voice"
                          ? "Click to record voice"
                          : mode === "camera"
                          ? "Open camera"
                          : "Drop a food photo here"}
                      </p>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-4 py-3.5 gradient-brand text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-orange-500/20"
            >
              {isGenerating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Recipe
                </>
              )}
            </button>

            {/* Analyzing steps */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 space-y-2"
              >
                {[
                  "Identifying dish and ingredients...",
                  "Calculating nutrition data...",
                  "Crafting recipe steps...",
                ].map((text, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: step > i ? 1 : 0.3, x: 0 }}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        step > i ? "bg-orange-400" : "bg-muted"
                      }`}
                    />
                    {text}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right: Recipe Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl glass border border-white/8 p-6 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {recipe ? (
                <motion.div
                  key="recipe"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-xl font-bold gradient-text">{recipe.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: Clock, label: "Prep", value: `${recipe.prepTime}m` },
                      { icon: Flame, label: "Cook", value: `${recipe.cookTime}m` },
                      { icon: ChefHat, label: "Level", value: recipe.difficulty },
                      { icon: Users, label: "Serves", value: recipe.servings },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center py-2.5 rounded-xl bg-white/5"
                      >
                        <Icon className="w-3.5 h-3.5 text-orange-400 mb-1" />
                        <div className="text-xs font-semibold">{value}</div>
                        <div className="text-[10px] text-muted-foreground">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Ingredients preview */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Ingredients</h4>
                    <div className="space-y-1.5">
                      {recipe.ingredients.slice(0, 4).map((ing, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-xs py-1 border-b border-white/5"
                        >
                          <span className="text-foreground">{ing.name}</span>
                          <span className="text-muted-foreground">
                            {ing.amount} {ing.unit}
                          </span>
                        </div>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <p className="text-xs text-orange-400">
                          +{recipe.ingredients.length - 4} more ingredients
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Nutrition strip */}
                  <div className="flex gap-3 py-3 px-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    {[
                      { label: "Cal", value: recipe.nutrition.calories },
                      { label: "Protein", value: `${recipe.nutrition.protein}g` },
                      { label: "Carbs", value: `${recipe.nutrition.carbohydrates}g` },
                      { label: "Fat", value: `${recipe.nutrition.fat}g` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex-1 text-center">
                        <div className="text-sm font-bold text-orange-300">{value}</div>
                        <div className="text-[10px] text-muted-foreground">{label}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    ✨ Sign up to see the full recipe, steps & tips
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                    <ChefHat className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">
                      Your recipe will appear here
                    </p>
                    <p className="text-sm text-muted-foreground/60 mt-1">
                      Upload a photo or type a dish name
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
