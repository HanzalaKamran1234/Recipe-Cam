"use client";

import { motion } from "framer-motion";
import { RecipeNutrition } from "@/lib/types";

interface NutritionChartProps {
  nutrition: RecipeNutrition;
}

export default function NutritionChart({ nutrition }: NutritionChartProps) {
  const macros = [
    { label: "Protein", value: nutrition.protein, unit: "g", color: "#f97316", max: 60 },
    { label: "Carbs", value: nutrition.carbohydrates, unit: "g", color: "#3b82f6", max: 100 },
    { label: "Fat", value: nutrition.fat, unit: "g", color: "#a855f7", max: 80 },
    { label: "Fiber", value: nutrition.fiber, unit: "g", color: "#22c55e", max: 30 },
    { label: "Sugar", value: nutrition.sugar, unit: "g", color: "#f59e0b", max: 50 },
  ];

  const others = [
    { label: "Calories", value: `${nutrition.calories} kcal` },
    { label: "Sodium", value: `${nutrition.sodium} mg` },
  ];

  return (
    <div className="p-6 rounded-2xl glass border border-white/8">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full gradient-brand" />
        Nutrition per Serving
      </h3>

      {/* Calorie highlight */}
      <div className="text-center mb-6 py-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
        <div className="text-4xl font-bold gradient-text">{nutrition.calories}</div>
        <div className="text-sm text-muted-foreground mt-1">calories</div>
      </div>

      {/* Macro bars */}
      <div className="space-y-4">
        {macros.map((macro, i) => {
          const percent = Math.min((macro.value / macro.max) * 100, 100);
          return (
            <div key={macro.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium">{macro.label}</span>
                <span className="text-muted-foreground">
                  {macro.value}{macro.unit}
                </span>
              </div>
              <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: macro.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Other values */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {others.map((item) => (
          <div
            key={item.label}
            className="p-3 rounded-xl bg-white/5 text-center"
          >
            <div className="text-sm font-semibold">{item.value}</div>
            <div className="text-xs text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
