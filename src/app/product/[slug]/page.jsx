"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { getProductBySlug, formatCurrency } from "../../../utils/fetchProducts";
import ProductGallery from "../../../components/ProductGallery";
import { Check, AlertCircle, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { motion } from "framer-motion";

export default function ProductPage({ params }) {
    const { slug } = params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const [selectedSize, setSelectedSize] = useState("");
    const [error, setError] = useState("");
    const { addToCart } = useCart();
    const [success, setSuccess] = useState(false);

    const handleAddToCart = () => {
        if (!product.sizes || product.sizes.length === 0) {
            addToCart(product, "One Size");
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            return;
        }

        if (!selectedSize) {
            setError("Please select a size");
            return;
        }

        addToCart(product, selectedSize);
        setError("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-24">
            <div className="container mx-auto px-6 lg:px-12 py-12">
                {/* Navigation Back */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Gallery - Takes 7 cols on desktop */}
                    <div className="lg:col-span-7">
                        <ProductGallery images={product.images} name={product.name} />
                    </div>

                    {/* Details - Takes 5 cols on desktop */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-4">
                                {product.category}
                            </p>
                            <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-6">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-10">
                                <p className="text-xl font-medium">{formatCurrency(product.price)}</p>
                                {product.originalPrice > product.price && (
                                    <p className="text-lg text-[var(--text-muted)] line-through">{formatCurrency(product.originalPrice)}</p>
                                )}
                            </div>

                            <div className="text-[var(--text-secondary)] leading-relaxed mb-12 font-light">
                                {product.description}
                            </div>

                            {/* Size Selection */}
                            <div className="mb-12">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs tracking-[0.2em] uppercase font-medium">Select Size</span>
                                    <button className="text-[10px] tracking-widest uppercase underline text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                                        Size Guide
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => {
                                                setSelectedSize(size);
                                                setError("");
                                            }}
                                            className={`min-w-[56px] h-14 flex items-center justify-center border text-sm transition-all duration-300 ${selectedSize === size
                                                    ? "bg-[var(--bg-accent)] text-[var(--text-inverse)] border-[var(--bg-accent)]"
                                                    : "bg-transparent text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--text-primary)]"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2 text-red-500 text-xs mt-4"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {error}
                                    </motion.div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="space-y-6">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className={`w-full py-5 text-center text-xs tracking-[0.3em] uppercase transition-all duration-500 ${product.inStock
                                            ? success
                                                ? "bg-green-600 text-white"
                                                : "bg-[var(--bg-accent)] text-[var(--text-inverse)] hover:opacity-90"
                                            : "bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed"
                                        }`}
                                >
                                    {product.inStock
                                        ? success ? "Item Added" : "Add to Bag"
                                        : "Out of Stock"
                                    }
                                </button>

                                <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] border-t border-[var(--border-color)] pt-8">
                                    <span>Free Shipping</span>
                                    <span>•</span>
                                    <span>Secured Payment</span>
                                    <span>•</span>
                                    <span>30 Day Returns</span>
                                </div>
                            </div>

                            {/* Details Toggle Mock */}
                            <div className="mt-16 space-y-6">
                                <details className="group border-t border-[var(--border-color)] pt-6">
                                    <summary className="list-none flex justify-between items-center cursor-pointer text-xs tracking-widest uppercase">
                                        Composition & Care
                                        <span className="text-xl font-light group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <div className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                                        Outer: 100% Organic Cotton. Crafted to last. Wash cold, line dry.
                                    </div>
                                </details>
                                <details className="group border-t border-[var(--border-color)] pt-6">
                                    <summary className="list-none flex justify-between items-center cursor-pointer text-xs tracking-widest uppercase">
                                        Shipping & Returns
                                        <span className="text-xl font-light group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <div className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                                        Free standard shipping on orders over ₹10,000. Simple returns within 30 days.
                                    </div>
                                </details>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
