"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
  const { user } = useUser();

  const sections = [
    {
      icon: User,
      title: "Profile",
      description: "Manage your personal information",
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Display Name
            </label>
            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm">
              {user?.fullName || "Not set"}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Email Address
            </label>
            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm">
              {user?.primaryEmailAddress?.emailAddress || "Not set"}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Profile details are managed through your Clerk account. Changes sync automatically.
          </p>
        </div>
      ),
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Control your notification preferences",
      content: (
        <div className="space-y-3">
          {[
            { label: "New recipe suggestions", enabled: true },
            { label: "Weekly cooking tips", enabled: false },
            { label: "Product updates", enabled: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <span className="text-sm">{item.label}</span>
              <div
                className={`w-10 h-6 rounded-full flex items-center px-1 transition-all ${
                  item.enabled ? "gradient-brand justify-end" : "bg-white/10 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow" />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Shield,
      title: "Privacy & Data",
      description: "Control your data and privacy settings",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div>
              <p className="text-sm font-medium">Public Recipes</p>
              <p className="text-xs text-muted-foreground">Allow others to view your recipes</p>
            </div>
            <div className="w-10 h-6 rounded-full bg-white/10 flex items-center px-1 justify-start">
              <div className="w-4 h-4 rounded-full bg-white shadow" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Analytics</p>
              <p className="text-xs text-muted-foreground">Help improve FlavorLens</p>
            </div>
            <div className="w-10 h-6 rounded-full gradient-brand flex items-center px-1 justify-end">
              <div className="w-4 h-4 rounded-full bg-white shadow" />
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Palette,
      title: "Appearance",
      description: "Customize your interface",
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-2">
              Theme
            </label>
            <div className="flex gap-3">
              {["Dark", "Light", "System"].map((t) => (
                <button
                  key={t}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                    t === "Dark"
                      ? "gradient-brand text-white border-transparent shadow-lg shadow-orange-500/20"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">
          Account <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your profile and preferences.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-2xl glass border border-white/8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-md shadow-orange-500/20">
                <section.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">{section.title}</h2>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </div>
            </div>
            {section.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
