"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAllProducts } from "../utils/fetchProducts";
import ProductGrid from "../components/ProductGrid";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function Home() {
    const allProducts = getAllProducts();
    const featuredProducts = allProducts.slice(0, 8);

    const fadeUp = {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section - Full Viewport */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <Image
                    src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg"
                    alt="Vilify Collection"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Content */}
                <div className="relative z-10 text-center text-white px-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xs tracking-[0.3em] uppercase mb-6"
                    >
                        New Collection 2025
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="heading-display mb-8"
                    >
                        Redefine
                        <br />
                        Your Style
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/products" className="btn-primary bg-white text-black hover:bg-white/90">
                            Shop Now
                        </Link>
                        <Link href="/collections" className="btn-secondary border-white text-white hover:bg-white hover:text-black">
                            View Collections
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-5 h-5 text-white/60" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Collections Grid */}
            <section className="py-24 lg:py-32 bg-[var(--bg-primary)]">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-4">
                            Explore
                        </p>
                        <h2 className="heading-xl">Collections</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                        {/* Large Featured */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:row-span-2"
                        >
                            <Link href="/products?category=Men" className="group block relative h-[500px] lg:h-full overflow-hidden">
                                <Image
                                    src="https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg"
                                    alt="Men's Collection"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <p className="text-xs tracking-[0.2em] uppercase text-white/70 mb-2">Collection</p>
                                    <h3 className="text-3xl lg:text-4xl font-light text-white mb-4">Men</h3>
                                    <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white group-hover:gap-4 transition-all">
                                        Explore <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Women */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <Link href="/products?category=Women" className="group block relative h-[300px] lg:h-[350px] overflow-hidden">
                                <Image
                                    src="https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                                    alt="Women's Collection"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <p className="text-xs tracking-[0.2em] uppercase text-white/70 mb-2">Collection</p>
                                    <h3 className="text-2xl lg:text-3xl font-light text-white mb-3">Women</h3>
                                    <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white group-hover:gap-4 transition-all">
                                        Explore <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Accessories */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Link href="/products?category=Accessories" className="group block relative h-[300px] lg:h-[350px] overflow-hidden bg-[var(--bg-secondary)]">
                                <Image
                                    src="https://images.pexels.com/photos/1450116/pexels-photo-1450116.jpeg"
                                    alt="Accessories"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2">Collection</p>
                                    <h3 className="text-2xl lg:text-3xl font-light text-[var(--text-primary)] mb-3">Accessories</h3>
                                    <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--text-secondary)] group-hover:gap-4 transition-all">
                                        Explore <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 lg:py-32 bg-[var(--bg-secondary)]">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6"
                    >
                        <div>
                            <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-4">
                                Fresh Drops
                            </p>
                            <h2 className="heading-xl">New Arrivals</h2>
                        </div>
                        <Link
                            href="/products"
                            className="group inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            View All
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <ProductGrid products={featuredProducts} />
                </div>
            </section>

            {/* Editorial Statement */}
            <section className="py-32 lg:py-48 bg-[var(--bg-primary)]">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="heading-display mb-8">
                            Fashion
                            <br />
                            Without Limits
                        </h2>
                        <p className="text-lg lg:text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
                            We believe in clothing that speaks. Every piece is designed
                            to make a statement, crafted with premium materials for those
                            who refuse to blend in.
                        </p>
                        <Link href="/about" className="btn-secondary">
                            Our Story
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Split Image Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[500px] lg:h-[700px]">
                    <Image
                        src="https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg"
                        alt="Editorial"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative h-[500px] lg:h-[700px] flex items-center justify-center bg-[var(--bg-secondary)] p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-md text-center lg:text-left"
                    >
                        <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-6">
                            Crafted With Care
                        </p>
                        <h3 className="heading-lg mb-6">
                            Premium Quality, Timeless Design
                        </h3>
                        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                            Each garment is made from carefully selected materials,
                            ensuring both comfort and durability. Our attention to detail
                            sets us apart.
                        </p>
                        <Link href="/products" className="btn-primary">
                            Shop Collection
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Minimal Marquee */}
            <div className="border-y border-[var(--border-color)] py-4 overflow-hidden bg-[var(--bg-primary)]">
                <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs tracking-[0.2em] uppercase text-[var(--text-muted)]">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-16 items-center">
                            <span>Free Shipping Over ₹10,000</span>
                            <span className="w-1 h-1 bg-[var(--text-muted)] rounded-full" />
                            <span>Premium Quality</span>
                            <span className="w-1 h-1 bg-[var(--text-muted)] rounded-full" />
                            <span>Worldwide Delivery</span>
                            <span className="w-1 h-1 bg-[var(--text-muted)] rounded-full" />
                            <span>Vilify Clothing</span>
                            <span className="w-1 h-1 bg-[var(--text-muted)] rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
