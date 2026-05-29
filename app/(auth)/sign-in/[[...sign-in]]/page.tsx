import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background grid-bg px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[120px]" />
      </div>
      <div className="relative">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            Welcome to <span className="gradient-text">FlavorLens</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to generate AI recipes</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card border border-white/8 shadow-2xl shadow-black/40 rounded-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "bg-white/5 border border-white/10 text-foreground hover:bg-white/10 transition-colors",
              formButtonPrimary: "gradient-brand text-white hover:opacity-90 transition-opacity",
              formFieldInput:
                "bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:border-orange-500/50 rounded-xl",
              footerAction: "text-muted-foreground",
              footerActionLink: "text-orange-400 hover:text-orange-300",
            },
          }}
        />
      </div>
    </div>
  );
}
