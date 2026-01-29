"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Users, Globe, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const stats = [
        { label: "Community", value: "50K+", icon: Users },
        { label: "Global Presence", value: "30+", icon: Globe },
        { label: "Pieces Created", value: "100K+", icon: Heart },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-24">
            {/* Hero Section - Editorial Style */}
            <section className="relative py-24 lg:py-48 overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)]">
                                Our Philosophy
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="heading-display mb-12"
                        >
                            Redefining the
                            <br />
                            Modern Wardrobe
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-xl lg:text-2xl text-[var(--text-secondary)] leading-relaxed max-w-2xl font-light"
                        >
                            We don't just create clothes. We curate experiences for the bold,
                            the ambitious, and the unapologetically unique.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Split Image Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[600px] lg:h-[800px]">
                    <Image
                        src="/images/slide1.avif"
                        alt="Vilify Craftsmanship"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="bg-[var(--bg-secondary)] flex items-center justify-center p-12 lg:p-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-md"
                    >
                        <h2 className="heading-lg mb-8">The Birth of a Movement</h2>
                        <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
                            <p>
                                Founded in 2024, Vilify emerged from a singular vision:
                                fashion should be an extension of identity, not a mask.
                            </p>
                            <p>
                                We saw a world of mass-produced mediocrity and chose a different path.
                                A path of precision, premium materials, and designs that demand attention.
                            </p>
                            <p>
                                Our name reflects our rebellious nature. In an age of conformity,
                                we embrace the friction of standing out.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Block */}
            <section className="py-24 lg:py-32 border-y border-[var(--border-color)]">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center md:text-left"
                            >
                                <div className="text-5xl lg:text-6xl font-light tracking-tighter mb-4">
                                    {stat.value}
                                </div>
                                <div className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)]">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 lg:py-48">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                        <div className="lg:w-1/3">
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-6 block">Values</span>
                            <h2 className="heading-lg">Committed to Excellence</h2>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                            {[
                                {
                                    title: "Quality First",
                                    desc: "We source only the finest fabrics and work with elite artisans to ensure every stitch is perfect."
                                },
                                {
                                    title: "Bold Design",
                                    desc: "Our design language is one of confidence. We don't follow trends; we create them."
                                },
                                {
                                    title: "Sustainability",
                                    desc: "Premium quality means longevity. We build pieces that last, reducing the impact of fast fashion."
                                },
                                {
                                    title: "Community",
                                    desc: "Vilify is more than a brand; it's a global collective of like-minded individuals."
                                },
                            ].map((value, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <h3 className="text-lg font-medium mb-4 uppercase tracking-widest">{value.title}</h3>
                                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                                        {value.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 lg:py-48 bg-[var(--bg-accent)] text-[var(--text-inverse)]">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-8">Ready to join the collective?</h2>
                        <Link href="/products" className="group inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase font-medium">
                            Explore Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
