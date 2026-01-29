"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/format";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
    const shipping = subtotal > 10000 ? 0 : 500;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center px-6"
                >
                    <div className="w-20 h-20 mx-auto mb-10 bg-[var(--bg-secondary)] flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-[var(--text-muted)]" />
                    </div>
                    <h1 className="heading-lg mb-4">Your bag is empty</h1>
                    <p className="text-[var(--text-secondary)] text-sm mb-12 font-light max-w-sm mx-auto">
                        Your shopping bag is currently empty. Explore our latest pieces and find something you love.
                    </p>
                    <Link href="/products" className="btn-primary">
                        Browse Collection
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-24 lg:pt-32">
            <div className="container mx-auto px-6 lg:px-12 py-12">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left Side: Cart Items */}
                    <div className="flex-grow">
                        <div className="flex items-end justify-between mb-12 border-b border-[var(--border-color)] pb-8">
                            <div>
                                <h1 className="heading-lg">Shopping Bag</h1>
                                <p className="text-xs tracking-widest uppercase text-[var(--text-muted)] mt-4">
                                    {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                                </p>
                            </div>
                            <button
                                onClick={clearCart}
                                className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] hover:text-red-500 transition-colors"
                            >
                                Empty Bag
                            </button>
                        </div>

                        <div className="space-y-12">
                            <AnimatePresence mode="popLayout">
                                {cart.map((item, index) => (
                                    <motion.div
                                        key={`${item.id}-${item.selectedSize}`}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.4 }}
                                        className="flex gap-8 group"
                                    >
                                        {/* Product Image */}
                                        <Link
                                            href={`/product/${item.slug}`}
                                            className="relative w-32 h-44 lg:w-40 lg:h-52 flex-shrink-0 bg-[var(--bg-secondary)] overflow-hidden"
                                        >
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </Link>

                                        {/* Product Info */}
                                        <div className="flex-grow flex flex-col py-2">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <Link
                                                        href={`/product/${item.slug}`}
                                                        className="text-lg lg:text-xl font-light hover:text-[var(--text-muted)] transition-colors"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-xs tracking-widest uppercase text-[var(--text-muted)] mt-2">
                                                        Size: {item.selectedSize}
                                                    </p>
                                                </div>
                                                <p className="text-lg font-medium">
                                                    {formatCurrency(item.price * item.quantity)}
                                                </p>
                                            </div>

                                            <p className="text-xs text-[var(--text-muted)] mb-auto tracking-wide font-light">
                                                {item.category}
                                            </p>

                                            <div className="flex justify-between items-center mt-8">
                                                {/* Quantity Control */}
                                                <div className="flex items-center border border-[var(--border-color)]">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.selectedSize, Math.max(1, item.quantity - 1))
                                                        }
                                                        className="p-3 hover:bg-[var(--bg-secondary)] transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-10 text-center text-xs font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.selectedSize, item.quantity + 1)
                                                        }
                                                        className="p-3 hover:bg-[var(--bg-secondary)] transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                    className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-[var(--text-muted)] hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-16 pt-12 border-t border-[var(--border-color)]">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Collection
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:w-[400px]">
                        <div className="bg-[var(--bg-secondary)] p-8 lg:p-12 lg:sticky lg:top-40">
                            <h2 className="text-xs tracking-[0.3em] uppercase font-bold mb-10 pb-6 border-b border-[var(--border-color)]">
                                Summary
                            </h2>

                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--text-secondary)] font-light">Subtotal</span>
                                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--text-secondary)] font-light">Shipping</span>
                                    {shipping === 0 ? (
                                        <span className="font-medium text-green-600 uppercase text-[10px] tracking-widest">Free</span>
                                    ) : (
                                        <span className="font-medium">{formatCurrency(shipping)}</span>
                                    )}
                                </div>
                                {shipping > 0 && (
                                    <p className="text-[10px] tracking-wide text-[var(--text-muted)] italic">
                                        Free shipping on orders over ₹10,000
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-[var(--border-color)] pt-8 mb-12">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs tracking-[0.2em] uppercase font-bold">Total</span>
                                    <span className="text-2xl font-light tracking-tight">{formatCurrency(total)}</span>
                                </div>
                                <p className="text-[10px] text-[var(--text-muted)] mt-2 italic">
                                    Including VAT and duties
                                </p>
                            </div>

                            <Link
                                href="/checkout"
                                className="btn-primary w-full py-6 text-sm tracking-[0.3em]"
                            >
                                Checkout
                            </Link>

                            <div className="mt-10 flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)]">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    Secure SSL Checkout
                                </div>
                                <div className="flex items-center gap-3 text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)]">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    30-Day Easy Returns
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
