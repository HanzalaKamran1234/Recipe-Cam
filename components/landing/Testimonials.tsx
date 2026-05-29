"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amna Tariq",
    role: "Home Cook · Lahore",
    avatar: "AT",
    rating: 5,
    text: "FlavorLens is mind-blowing! I photographed leftover dal and it gave me a complete recipe with tips I never thought of. The Pakistani spice suggestions were spot-on!",
    color: "from-orange-500 to-amber-400",
  },
  {
    name: "Marcus Chen",
    role: "Food Blogger · NYC",
    avatar: "MC",
    rating: 5,
    text: "I use this daily for content creation. The nutrition breakdown is incredibly accurate, and the 'make it healthier' button saved my keto readers so much time.",
    color: "from-violet-500 to-purple-400",
  },
  {
    name: "Sofia Russo",
    role: "Chef · Rome",
    avatar: "SR",
    rating: 5,
    text: "As a professional chef, I was skeptical. But the AI identified obscure Italian ingredients from my photo and generated an authentic ragù recipe that rivals my grandmother's.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    name: "Raza Ahmed",
    role: "Software Engineer · Karachi",
    avatar: "RA",
    rating: 5,
    text: "I photographed biryani from a restaurant and got a recipe that tastes almost identical. The voice input is great when my hands are messy from cooking!",
    color: "from-pink-500 to-rose-400",
  },
  {
    name: "Emma Johnson",
    role: "Nutritionist · London",
    avatar: "EJ",
    rating: 5,
    text: "My clients love it. The macro breakdown is accurate enough that I recommend it as a meal planning tool. The high-protein refinement feature is exceptional.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Yuki Tanaka",
    role: "Recipe Developer · Tokyo",
    avatar: "YT",
    rating: 5,
    text: "The cuisine accuracy is unreal. It identified my miso-glazed eggplant photo perfectly and suggested regional variations I hadn't considered. Worth every penny.",
    color: "from-amber-500 to-yellow-400",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Loved by 50,000+ cooks
          </h2>
          <p className="text-muted-foreground text-lg">
            From home cooks to professional chefs — FlavorLens transforms how people cook.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-2xl glass border border-white/6 hover:border-white/10 hover:shadow-xl transition-all duration-300 cursor-default"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
