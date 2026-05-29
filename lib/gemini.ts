import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { GeneratedRecipe, GenerateRecipeRequest, RefineMode } from "./types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

const SYSTEM_CONTEXT = `You are FlavorLens AI — a world-class chef, nutritionist, and culinary scientist with Michelin-level expertise. 
You analyze food images and descriptions to generate complete, accurate, beautifully structured recipes.
You are precise with measurements, realistic with calorie counts, creative with tips, and culturally authentic.
Always return valid JSON only — no markdown, no prose, just the JSON object.`;

const RECIPE_SCHEMA = `{
  "title": "string",
  "description": "string (2-3 sentences, appetizing)",
  "cuisine": "string (e.g. Italian, Pakistani, Mexican)",
  "difficulty": "Easy | Medium | Hard | Expert",
  "prepTime": number (minutes),
  "cookTime": number (minutes),
  "servings": number,
  "calories": number (per serving),
  "ingredients": [
    { "name": "string", "amount": "string", "unit": "string", "notes": "string (optional)" }
  ],
  "instructions": [
    { "step": number, "title": "string (short)", "description": "string (detailed)", "duration": "string (optional, e.g. '5 minutes')" }
  ],
  "nutrition": {
    "calories": number,
    "protein": number (grams),
    "carbohydrates": number (grams),
    "fat": number (grams),
    "fiber": number (grams),
    "sugar": number (grams),
    "sodium": number (mg)
  },
  "tips": [
    { "title": "string", "description": "string" }
  ],
  "tags": ["string"],
  "alternativeIngredients": [
    { "original": "string", "alternatives": ["string"] }
  ]
}`;

export async function generateRecipeFromImage(
  imageBase64: string,
  mimeType: string
): Promise<GeneratedRecipe> {
  const prompt = `${SYSTEM_CONTEXT}

Analyze this food image carefully. Identify the dish, detect all visible ingredients, understand the cuisine style, and generate a complete professional recipe.

Return ONLY a JSON object matching this exact schema:
${RECIPE_SCHEMA}

Be specific, accurate, and detailed. Include at least 6 ingredients, 5 cooking steps, and 3 tips.`;

  const result = await model.generateContent([
    {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType as "image/jpeg" | "image/png" | "image/webp",
      },
    },
    { text: prompt },
  ]);

  const text = result.response.text();
  return parseRecipeJSON(text);
}

export async function generateRecipeFromText(
  description: string,
  refineMode?: RefineMode,
  existingRecipe?: GeneratedRecipe
): Promise<GeneratedRecipe> {
  let prompt: string;

  if (refineMode && existingRecipe) {
    const refinementMap: Record<RefineMode, string> = {
      healthier:
        "Make this recipe significantly healthier by reducing calories, fat, and sodium. Use wholesome substitutes. Keep flavor.",
      spicy:
        "Make this recipe much spicier by adding chilies, hot sauce, and bold spices. Adjust seasonings.",
      vegetarian:
        "Convert this recipe to be fully vegetarian. Replace all meat with plant-based alternatives.",
      "high-protein":
        "Maximize the protein content. Add protein-rich ingredients. Target 40g+ protein per serving.",
      budget:
        "Make this recipe budget-friendly under $5 per serving. Use economical ingredient substitutes.",
      pakistani:
        "Give this recipe authentic Pakistani flavor with traditional spices like cumin, coriander, garam masala, turmeric.",
      indian:
        "Transform this into an authentic Indian dish with traditional spices, aromatics, and cooking methods.",
      keto: "Make this recipe keto-friendly. Eliminate all high-carb ingredients. Keep carbs under 5g per serving.",
    };

    prompt = `${SYSTEM_CONTEXT}

Here is an existing recipe:
${JSON.stringify(existingRecipe, null, 2)}

Refinement instruction: ${refinementMap[refineMode]}

Return a MODIFIED version of this recipe as ONLY a JSON object matching this schema:
${RECIPE_SCHEMA}`;
  } else {
    prompt = `${SYSTEM_CONTEXT}

The user wants a recipe for: "${description}"

Generate a complete, professional, detailed recipe for this dish.

Return ONLY a JSON object matching this exact schema:
${RECIPE_SCHEMA}

Include at least 6 ingredients, 5 cooking steps, and 3 chef's tips. Be specific with measurements.`;
  }

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseRecipeJSON(text);
}

function parseRecipeJSON(text: string): GeneratedRecipe {
  // Strip markdown code fences if present
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  // Find JSON object
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON object found in AI response");
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]) as GeneratedRecipe;
    // Validate required fields
    if (!parsed.title || !parsed.ingredients || !parsed.instructions) {
      throw new Error("Invalid recipe structure from AI");
    }
    return parsed;
  } catch {
    throw new Error("Failed to parse recipe JSON from AI response");
  }
}
