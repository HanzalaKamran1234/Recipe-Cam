"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does FlavorLens identify food from photos?",
    a: "FlavorLens uses Google's Gemini 2.5 Flash Vision model — one of the most advanced multimodal AI systems available. It analyzes visual patterns, textures, colors, and context to identify dishes with 98%+ accuracy.",
  },
  {
    q: "Are the calorie counts accurate?",
    a: "Calorie estimates are based on standard nutritional databases and ingredient analysis. They're highly accurate for common dishes (within 10-15%), but individual variations in portions and recipes may differ.",
  },
  {
    q: "Can I use FlavorLens without uploading a photo?",
    a: "Absolutely! You can type a dish name, speak it using the voice input feature, or describe ingredients you have on hand. FlavorLens generates complete recipes from any input.",
  },
  {
    q: "What does the recipe refinement feature do?",
    a: "You can transform any generated recipe into a healthier, spicier, vegetarian, high-protein, keto, budget-friendly, Pakistani, or Indian version with one click. The AI adapts the entire recipe including ingredients, steps, and nutrition.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Images are processed server-side via Gemini API and are never stored permanently. Your recipes and history are tied to your account and fully private. We follow industry-standard security practices.",
  },
  {
    q: "How many recipes can I generate?",
    a: "Free accounts get 10 recipe generations per month. Pro accounts get unlimited generations plus priority AI processing and premium features like printable recipe cards.",
  },
  {
    q: "Does it work for all cuisines?",
    a: "FlavorLens supports 180+ international cuisines including Pakistani, Indian, Italian, Japanese, Mexican, Middle Eastern, French, Chinese, Korean, and many more.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Questions & answers
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about FlavorLens.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl glass border border-white/6 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors"
              >
                <span className="text-sm font-semibold pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
