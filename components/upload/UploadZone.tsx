"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Upload, X, Sparkles, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { fileToBase64, compressImage } from "@/lib/utils";
import { GeneratedRecipe } from "@/lib/types";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onRecipeGenerated: (recipe: GeneratedRecipe, id?: string) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export default function UploadZone({
  onRecipeGenerated,
  isLoading,
  setIsLoading,
}: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState("image/jpeg");
  const [scanProgress, setScanProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file);
      const compressedFile = new File([compressed], file.name, { type: "image/jpeg" });
      const base64 = await fileToBase64(compressedFile);
      const url = URL.createObjectURL(compressed);
      setPreview(url);
      setImageBase64(base64);
      setImageMimeType("image/jpeg");
    } catch {
      toast.error("Failed to process image");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleGenerate = async () => {
    if (!imageBase64) {
      toast.error("Please upload an image first");
      return;
    }

    setIsLoading(true);
    setScanProgress(0);

    // Animate progress
    const progressInterval = setInterval(() => {
      setScanProgress((p) => Math.min(p + 8, 90));
    }, 400);

    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          imageMimeType,
          sourceType: "image",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate recipe");
      }

      clearInterval(progressInterval);
      setScanProgress(100);
      await new Promise((r) => setTimeout(r, 300));

      onRecipeGenerated(data.recipe, data.id);
      toast.success("Recipe generated!");
    } catch (error) {
      clearInterval(progressInterval);
      setScanProgress(0);
      toast.error(error instanceof Error ? error.message : "Failed to generate recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setPreview(null);
    setImageBase64(null);
    setScanProgress(0);
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden",
          isDragActive
            ? "border-orange-500 bg-orange-500/10"
            : preview
            ? "border-white/20 bg-transparent"
            : "border-white/10 bg-white/3 hover:border-orange-500/50 hover:bg-orange-500/5"
        )}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="relative h-56 sm:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Food preview"
              className="w-full h-full object-cover"
            />

            {/* Scan overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/50">
                <motion.div
                  className="absolute inset-x-0 h-0.5 bg-orange-400/80 shadow-lg shadow-orange-400/50"
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-8 h-8 text-orange-400" />
                  </motion.div>
                  <p className="text-sm font-semibold text-white">
                    AI analyzing...
                  </p>
                  <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-brand rounded-full"
                      animate={{ width: `${scanProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Clear button */}
            {!isLoading && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clear();
                }}
                className="absolute top-3 right-3 p-1.5 rounded-xl bg-black/70 hover:bg-black/90 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <motion.div
              animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
              className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
            >
              {isDragActive ? (
                <ImageIcon className="w-8 h-8 text-orange-400" />
              ) : (
                <Upload className="w-8 h-8 text-muted-foreground" />
              )}
            </motion.div>
            <div className="text-center">
              <p className="font-semibold text-sm">
                {isDragActive ? "Drop your food photo" : "Drag & drop a food photo"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                or click to browse · JPG, PNG, WEBP
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Generate button */}
      <motion.button
        onClick={handleGenerate}
        disabled={!imageBase64 || isLoading}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 gradient-brand text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Analyzing with Gemini Vision...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Recipe from Photo
          </>
        )}
      </motion.button>
    </div>
  );
}
