import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  generateRecipeFromImage,
  generateRecipeFromText,
} from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { GenerateRecipeRequest } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();

    const body: GenerateRecipeRequest = await req.json();
    const { imageBase64, imageMimeType, prompt, sourceType, refineMode, existingRecipe } = body;

    if (!imageBase64 && !prompt) {
      return NextResponse.json(
        { error: "Either imageBase64 or prompt is required" },
        { status: 400 }
      );
    }

    let user = null;
    if (clerkId) {
      user = await prisma.user.findUnique({ where: { clerkId } });
      if (!user) {
        // Fallback: Sync user dynamically if not found in database yet
        const clerkUser = await currentUser();
        if (clerkUser) {
          const email = clerkUser.emailAddresses[0]?.emailAddress || "";
          const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || null;
          const imageUrl = clerkUser.imageUrl || null;
          user = await prisma.user.create({
            data: {
              clerkId,
              email,
              name,
              imageUrl,
              credits: 10,
            },
          });
        } else {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
      }
      if (user.credits <= 0) {
        return NextResponse.json(
          { error: "No credits remaining. Please upgrade." },
          { status: 403 }
        );
      }
    }

    let recipe;
    if (sourceType === "image" && imageBase64) {
      recipe = await generateRecipeFromImage(
        imageBase64,
        imageMimeType || "image/jpeg"
      );
    } else {
      recipe = await generateRecipeFromText(
        prompt || "",
        refineMode,
        existingRecipe
      );
    }

    // Save to DB if authenticated
    if (user && !refineMode) {
      const saved = await prisma.$transaction(async (tx) => {
        const newRecipe = await tx.recipe.create({
          data: {
            userId: user!.id,
            title: recipe.title,
            description: recipe.description,
            cuisine: recipe.cuisine,
            difficulty: recipe.difficulty,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            servings: recipe.servings,
            calories: recipe.calories,
            ingredients: recipe.ingredients as object[],
            instructions: recipe.instructions as object[],
            nutrition: recipe.nutrition as object,
            tips: recipe.tips as object[],
            tags: recipe.tags || [],
            sourceType,
            prompt: prompt || undefined,
          },
        });

        await tx.user.update({
          where: { id: user!.id },
          data: { credits: { decrement: 1 } },
        });

        return newRecipe;
      });

      return NextResponse.json({ recipe, id: saved.id });
    }

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("[GENERATE_RECIPE]", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate recipe";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
