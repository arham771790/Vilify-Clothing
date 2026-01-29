"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images, name }) {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) return null;

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Thumbnails - Left on desktop */}
            <div className="hidden lg:flex flex-col gap-3 w-20 flex-shrink-0">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-[3/4] overflow-hidden transition-opacity duration-300 ${selectedImage === index ? "opacity-100" : "opacity-40 hover:opacity-100"
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`${name} ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        {selectedImage === index && (
                            <div className="absolute inset-0 border-b border-[var(--text-primary)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-grow aspect-[3/4] bg-[var(--bg-secondary)] overflow-hidden group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[selectedImage]}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <button
                            onClick={prevImage}
                            className="p-2 bg-[var(--bg-primary)] text-[var(--text-primary)] pointer-events-auto hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="p-2 bg-[var(--bg-primary)] text-[var(--text-primary)] pointer-events-auto hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Mobile Thumbnails (Horizontal) */}
                <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${selectedImage === index ? "bg-[var(--text-primary)] w-4" : "bg-[var(--text-primary)]/20"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
