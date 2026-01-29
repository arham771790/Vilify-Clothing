"use client";

import Link from "next/link";
import { Instagram, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const footerLinks = {
        shop: [
            { label: "All Products", href: "/products" },
            { label: "Men", href: "/products?category=Men" },
            { label: "Women", href: "/products?category=Women" },
            { label: "Accessories", href: "/products?category=Accessories" },
        ],
        help: [
            { label: "Contact", href: "/contact" },
            { label: "Shipping", href: "/shipping" },
            { label: "Returns", href: "/returns" },
            { label: "FAQ", href: "/faq" },
        ],
        company: [
            { label: "About", href: "/about" },
            { label: "Sustainability", href: "/sustainability" },
            { label: "Careers", href: "/careers" },
        ],
    };

    return (
        <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
            {/* Newsletter Section */}
            <div className="border-b border-[var(--border-color)]">
                <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
                    <div className="max-w-xl">
                        <h3 className="text-2xl lg:text-3xl font-light tracking-tight mb-4">
                            Stay Updated
                        </h3>
                        <p className="text-[var(--text-secondary)] text-sm mb-8">
                            Subscribe for exclusive releases and 10% off your first order.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input flex-grow"
                                required
                            />
                            <button
                                type="submit"
                                className="btn-primary whitespace-nowrap"
                            >
                                {subscribed ? "Done" : "Subscribe"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-xl font-light tracking-[0.3em] uppercase">
                                Vilify
                            </span>
                        </Link>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xs">
                            Premium fashion for the modern individual.
                            Designed with intention, crafted with care.
                        </p>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            <Instagram className="w-4 h-4" />
                            @vilify
                        </a>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-xs font-medium uppercase tracking-widest mb-6">
                            Shop
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h4 className="text-xs font-medium uppercase tracking-widest mb-6">
                            Help
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.help.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-xs font-medium uppercase tracking-widest mb-6">
                            Company
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--border-color)]">
                <div className="container mx-auto px-6 lg:px-12 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-[var(--text-muted)]">
                            © {new Date().getFullYear()} Vilify. All rights reserved.
                        </p>
                        <div className="flex gap-8 text-xs text-[var(--text-muted)]">
                            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors">
                                Terms
                            </Link>
                            <Link href="/cookies" className="hover:text-[var(--text-primary)] transition-colors">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
