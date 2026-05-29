import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Sync user to DB (called on first sign-in)
    const body = await req.json();
    const { email, name, imageUrl } = body;

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: { email, name, imageUrl },
      create: { clerkId, email, name, imageUrl, credits: 10 },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("[SYNC_USER]", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        _count: {
          select: { recipes: true, savedRecipes: true },
        },
      },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("[GET_USER]", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
