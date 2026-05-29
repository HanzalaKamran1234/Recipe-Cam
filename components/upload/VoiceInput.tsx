"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { GeneratedRecipe } from "@/lib/types";

interface VoiceInputProps {
  onRecipeGenerated: (recipe: GeneratedRecipe, id?: string) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export default function VoiceInput({
  onRecipeGenerated,
  isLoading,
  setIsLoading,
}: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = (e: any) => {
      const t = Array.from(e.results)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((r: any) => r[0].transcript)
        .join("");
      setTranscript(t);
    };

    rec.onend = () => setIsRecording(false);
    rec.onerror = () => {
      setIsRecording(false);
      toast.error("Voice recognition failed");
    };

    recognitionRef.current = rec;
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleGenerate = async () => {
    if (!transcript.trim()) {
      toast.error("Please record a dish name first");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: transcript,
          sourceType: "voice",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate recipe");

      onRecipeGenerated(data.recipe, data.id);
      toast.success("Recipe generated from voice!");
      setTranscript("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate recipe");
    } finally {
      setIsLoading(false);
    }
  };

  if (!supported) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Voice recognition is not supported in your browser.
        <br />
        Please use Chrome or Edge.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Microphone button */}
      <div className="relative">
        <AnimatePresence>
          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/20"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleRecording}
          disabled={isLoading}
          whileTap={{ scale: 0.95 }}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
            isRecording
              ? "bg-red-500 shadow-red-500/40"
              : "gradient-brand shadow-orange-500/30 hover:shadow-orange-500/50"
          }`}
        >
          {isRecording ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </motion.button>
      </div>

      {/* Status text */}
      <p className="text-sm text-muted-foreground">
        {isRecording
          ? "Listening... Speak your dish name"
          : "Tap to start recording"}
      </p>

      {/* Transcript box */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <p className="text-sm text-center font-medium">&ldquo;{transcript}&rdquo;</p>
        </motion.div>
      )}

      {/* Generate button */}
      {transcript && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-3.5 gradient-brand text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50 transition-all"
        >
          {isLoading ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Generating recipe...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Recipe
            </>
          )}
        </motion.button>
      )}
    </div>
  );
}
