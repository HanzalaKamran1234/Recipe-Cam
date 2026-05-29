# FlavorLens 🍽️ — AI Recipe Generator

> **Snap. Analyze. Cook.** — Upload a food photo and get a complete AI-generated recipe instantly.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org)
[![Gemini Vision](https://img.shields.io/badge/Powered%20by-Gemini%202.5%20Flash-blue?style=flat&logo=google)](https://ai.google.dev)

---

## ✨ Features

- 📸 **Photo to Recipe** — Upload any food photo, Gemini Vision identifies the dish and generates a complete recipe
- 🎙️ **Voice to Recipe** — Speak a dish name using Web Speech API
- ✏️ **Text to Recipe** — Describe a dish or pick from popular suggestions
- 🤖 **Smart Refinement** — Transform any recipe: Healthier · Spicy · Vegetarian · High-Protein · Keto · Pakistani · Indian · Budget
- 📊 **Full Nutrition** — Calories, protein, carbs, fat, fiber, sugar, sodium per serving
- 💾 **Save & History** — Bookmark recipes, view full generation history
- 🔗 **Share & Print** — Copy link, native share, or print as recipe card
- 🌙 **Dark / Light Mode** — Beautiful in both themes
- 📱 **Mobile-First** — Perfect on any screen size

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HanzalaKamran1234/Recipe-Cam.git
cd Recipe-Cam/flavorlens
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in:

| Variable | Where to Get |
|----------|-------------|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [Clerk Dashboard](https://clerk.com) |
| `CLERK_SECRET_KEY` | [Clerk Dashboard](https://clerk.com) |
| `DATABASE_URL` | [Supabase Project Settings](https://supabase.com) |
| `DIRECT_URL` | [Supabase Project Settings](https://supabase.com) |

### 4. Set Up Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| UI Primitives | Shadcn/UI + Radix |
| Icons | Lucide React |
| AI | Gemini 2.5 Flash Vision |
| Auth | Clerk |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Deployment | Vercel |

---

## 📁 Project Structure

```
flavorlens/
├── app/
│   ├── (auth)/              # Sign in / Sign up pages
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── dashboard/       # Main generate page
│   │   ├── saved/           # Saved recipes
│   │   ├── history/         # Recipe history
│   │   └── settings/        # User settings
│   ├── api/
│   │   ├── generate-recipe/ # Gemini Vision AI endpoint
│   │   ├── recipes/         # Recipe CRUD
│   │   ├── save-recipe/     # Save/unsave toggle
│   │   └── user/            # User sync
│   └── page.tsx             # Landing page
├── components/
│   ├── landing/             # Hero, HowItWorks, Features, Demo, FAQ, Footer
│   ├── upload/              # UploadZone, VoiceInput, TextInput
│   ├── recipe/              # RecipeDetail, NutritionChart, RefineButtons
│   └── dashboard/           # Sidebar
├── lib/
│   ├── gemini.ts            # AI client + prompt engineering
│   ├── prisma.ts            # DB singleton
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Utility functions
└── prisma/
    └── schema.prisma        # Database schema
```

---

## 🌐 Deployment (Vercel)

```bash
npm run build  # Verify build passes
```

Then connect your GitHub repo to Vercel and add all environment variables in the Vercel dashboard.

---

## 📝 License

MIT — Built by [HanzalaKamran1234](https://github.com/HanzalaKamran1234)
