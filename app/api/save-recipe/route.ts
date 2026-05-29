import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
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

    const { recipeId } = await req.json();
    if (!recipeId) {
      return NextResponse.json({ error: "recipeId required" }, { status: 400 });
    }

    const existing = await prisma.savedRecipe.findUnique({
      where: { userId_recipeId: { userId: user.id, recipeId } },
    });

    if (existing) {
      await prisma.savedRecipe.delete({ where: { id: existing.id } });
      return NextResponse.json({ saved: false });
    }

    await prisma.savedRecipe.create({
      data: { userId: user.id, recipeId },
    });
    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("[SAVE_RECIPE]", error);
    return NextResponse.json({ error: "Failed to save recipe" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
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

    const saved = await prisma.savedRecipe.findMany({
      where: { userId: user.id },
      include: { recipe: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ saved });
  } catch (error) {
    console.error("[GET_SAVED]", error);
    return NextResponse.json({ error: "Failed to fetch saved recipes" }, { status: 500 });
  }
}
