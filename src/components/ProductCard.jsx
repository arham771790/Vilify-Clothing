"use client";

import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "../utils/format";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductCard({ product, index = 0 }) {
    const mainImage = product.images?.[0] || "/images/placeholder.jpg";
    const secondaryImage = product.images?.[1] || mainImage;
    const [isHovered, setIsHovered] = useState(false);

    const hasDiscount = product.originalPrice > product.price;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <Link
                href={`/product/${product.slug}`}
                className="block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] bg-[var(--bg-secondary)] mb-4 overflow-hidden">
                    {/* Primary Image */}
                    <Image
                        src={mainImage}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 ease-out ${isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
                            }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Secondary Image (shown on hover) */}
                    <Image
                        src={secondaryImage}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 ease-out ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
                            }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Quick View on Hover */}
                    <div
                        className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        <span className="block w-full text-center py-3 bg-[var(--bg-accent)] text-[var(--text-inverse)] text-xs font-medium tracking-widest uppercase">
                            Quick View
                        </span>
                    </div>

                    {/* Subtle top badge for sold out */}
                    {!product.inStock && (
                        <div className="absolute top-4 left-4">
                            <span className="text-xs tracking-widest uppercase text-[var(--text-muted)]">
                                Sold Out
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="space-y-2">
                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-normal text-[var(--text-primary)] group-hover:opacity-70 transition-opacity line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-[var(--text-primary)]">
                        {formatCurrency(product.price)}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-[var(--text-muted)] line-through">
                            {formatCurrency(product.originalPrice)}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
