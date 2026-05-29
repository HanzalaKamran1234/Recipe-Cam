import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await prisma.user.findUnique({ where: { clerkId } });
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.recipe.count({ where: { userId: user.id } }),
    ]);

    return NextResponse.json({ recipes, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("[GET_RECIPES]", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
