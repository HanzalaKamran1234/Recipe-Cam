import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FlavorLens — AI Recipe Generator",
    template: "%s | FlavorLens",
  },
  description:
    "Snap a food photo and instantly get a complete AI-generated recipe with ingredients, steps, calories, and nutrition. Powered by Gemini Vision.",
  keywords: [
    "AI recipe generator",
    "food photo recipe",
    "FlavorLens",
    "Gemini Vision",
    "recipe from photo",
    "cooking AI",
  ],
  authors: [{ name: "FlavorLens" }],
  creator: "FlavorLens",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flavorlens.vercel.app",
    title: "FlavorLens — AI Recipe Generator",
    description:
      "Snap a food photo and instantly get a complete AI-generated recipe with ingredients, steps, calories, and nutrition.",
    siteName: "FlavorLens",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlavorLens — AI Recipe Generator",
    description:
      "Snap a food photo and instantly get a complete AI-generated recipe.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={inter.variable}>
        <body className="antialiased bg-background text-foreground">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              theme="dark"
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
