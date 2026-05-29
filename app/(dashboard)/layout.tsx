import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Sync user with our database on layout load (Server-side)
  try {
    const user = await currentUser();
    if (user) {
      const email = user.emailAddresses[0]?.emailAddress || "";
      const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || null;
      const imageUrl = user.imageUrl || null;

      await prisma.user.upsert({
        where: { clerkId: userId },
        update: { email, name, imageUrl },
        create: {
          clerkId: userId,
          email,
          name,
          imageUrl,
          credits: 10, // give 10 free credits to start
        },
      });
    }
  } catch (error) {
    console.error("Failed to sync user with database:", error);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
