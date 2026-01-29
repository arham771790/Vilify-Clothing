"use client";

import Link from "next/link";
import Image from "next/image";
import categories from "../../data/categories.json";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* Hero */}
            <div className="bg-gradient-to-br from-[var(--bg-accent)] to-[var(--bg-tertiary)] py-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-[var(--text-inverse)] dark:text-[var(--text-primary)]"
                    >
                        Collections
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[var(--text-inverse)]/80 dark:text-[var(--text-secondary)] max-w-lg mx-auto"
                    >
                        Explore our curated collections designed to elevate your style
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={`/products?category=${cat.name}`}
                                className="group relative aspect-[4/5] block overflow-hidden rounded-2xl card"
                            >
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 bg-[var(--accent-primary)]/0 group-hover:bg-[var(--accent-primary)]/20 transition-colors duration-300" />

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h2 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">
                                        {cat.name}
                                    </h2>
                                    <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                                        Shop Now
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
