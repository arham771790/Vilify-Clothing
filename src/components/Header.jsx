"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Search, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const { totalItems } = useCart();
    const { theme, toggleTheme, mounted } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/products", label: "Shop" },
        { href: "/collections", label: "Collections" },
        { href: "/about", label: "About" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "glass-strong py-4"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    {/* Left Nav - Desktop */}
                    <nav className="hidden lg:flex items-center gap-10 flex-1">
                        {navLinks.slice(0, 2).map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-xs font-medium tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors link-underline"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Center Logo */}
                    <Link href="/" className="group flex-shrink-0">
                        <span className="text-xl lg:text-2xl font-light tracking-[0.3em] uppercase">
                            Vilify
                        </span>
                    </Link>

                    {/* Right Nav - Desktop */}
                    <nav className="hidden lg:flex items-center justify-end gap-10 flex-1">
                        <Link
                            href="/about"
                            className="text-xs font-medium tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors link-underline"
                        >
                            About
                        </Link>

                        {/* Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={toggleTheme}
                                className="p-2 hover:bg-[var(--bg-tertiary)] transition-colors rounded-full"
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={theme}
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {theme === "dark" ? (
                                            <Sun className="w-4 h-4" />
                                        ) : (
                                            <Moon className="w-4 h-4" />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                        )}

                        {/* Search */}
                        <Link
                            href="/search"
                            className="p-2 hover:bg-[var(--bg-tertiary)] transition-colors rounded-full"
                        >
                            <Search className="w-4 h-4" />
                        </Link>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative p-2 hover:bg-[var(--bg-tertiary)] transition-colors rounded-full"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-[var(--bg-accent)] text-[var(--text-inverse)] text-[9px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full font-medium"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </Link>
                    </nav>

                    {/* Mobile Actions */}
                    <div className="flex lg:hidden items-center gap-2">
                        {/* Theme Toggle Mobile */}
                        {mounted && (
                            <button
                                onClick={toggleTheme}
                                className="p-2 hover:bg-[var(--bg-tertiary)] transition-colors rounded-full"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? (
                                    <Sun className="w-4 h-4" />
                                ) : (
                                    <Moon className="w-4 h-4" />
                                )}
                            </button>
                        )}

                        {/* Cart Mobile */}
                        <Link
                            href="/cart"
                            className="relative p-2 hover:bg-[var(--bg-tertiary)] transition-colors rounded-full"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[var(--bg-accent)] text-[var(--text-inverse)] text-[9px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full font-medium">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Menu Toggle */}
                        <button
                            className="p-2 hover:bg-[var(--bg-tertiary)] transition-colors rounded-full"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden bg-[var(--bg-primary)] border-t border-[var(--border-color)] overflow-hidden"
                    >
                        <nav className="flex flex-col py-8 px-6">
                            {[...navLinks, { href: "/search", label: "Search" }].map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="block py-4 text-2xl font-light tracking-wide border-b border-[var(--border-color)] hover:pl-4 transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
