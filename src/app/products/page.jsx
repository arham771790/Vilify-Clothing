"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Filters from "../../components/Filters";
import SearchBar from "../../components/SearchBar";
import ProductGrid from "../../components/ProductGrid";
import { getAllProducts } from "../../utils/fetchProducts";
import categoriesData from "../../data/categories.json";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

function ProductsContent() {
    const searchParams = useSearchParams();
    const allProducts = getAllProducts();
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [showFilters, setShowFilters] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const sortOptions = [
        { value: "", label: "Featured" },
        { value: "price_asc", label: "Price: Low to High" },
        { value: "price_desc", label: "Price: High to Low" },
    ];

    const currentSort = searchParams.get("sort") || "";
    const currentSortLabel = sortOptions.find(s => s.value === currentSort)?.label || "Featured";

    useEffect(() => {
        let result = [...allProducts];

        const search = searchParams.get("search");
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(lowerSearch) ||
                    p.description.toLowerCase().includes(lowerSearch)
            );
        }

        const category = searchParams.get("category");
        if (category) {
            result = result.filter((p) => p.category === category);
        }

        const gender = searchParams.get("gender");
        if (gender) {
            result = result.filter(
                (p) => p.gender.toLowerCase() === gender.toLowerCase() || p.gender === "Unisex"
            );
        }

        const sort = searchParams.get("sort");
        if (sort === "price_asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sort === "price_desc") {
            result.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(result);
    }, [searchParams, allProducts]);

    const currentCategory = searchParams.get("category");

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-24">
            {/* Header */}
            <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-4">
                        {currentCategory || "All Products"}
                    </p>
                    <h1 className="heading-xl">
                        {currentCategory || "Shop All"}
                    </h1>
                </motion.div>
            </div>

            {/* Toolbar */}
            <div className="border-y border-[var(--border-color)]">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-6">
                            {/* Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 text-xs tracking-widest uppercase hover:text-[var(--text-primary)] transition-colors"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>

                            {/* Results Count */}
                            <span className="text-xs text-[var(--text-muted)]">
                                {filteredProducts.length} Products
                            </span>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setSortOpen(!sortOpen)}
                                className="flex items-center gap-2 text-xs tracking-widest uppercase"
                            >
                                Sort: {currentSortLabel}
                                <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                            </button>

                            {sortOpen && (
                                <div className="absolute right-0 top-full mt-2 bg-[var(--bg-primary)] border border-[var(--border-color)] min-w-[200px] z-20">
                                    {sortOptions.map((option) => (
                                        <a
                                            key={option.value}
                                            href={`?${new URLSearchParams({ ...Object.fromEntries(searchParams), sort: option.value }).toString()}`}
                                            className={`block px-4 py-3 text-xs tracking-wider hover:bg-[var(--bg-secondary)] transition-colors ${currentSort === option.value ? "bg-[var(--bg-secondary)]" : ""
                                                }`}
                                            onClick={() => setSortOpen(false)}
                                        >
                                            {option.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 py-12">
                <div className="flex gap-12">
                    {/* Sidebar Filters - Desktop */}
                    <aside
                        className={`${showFilters ? "block" : "hidden"} lg:block w-64 flex-shrink-0 transition-all`}
                    >
                        <div className="sticky top-28">
                            <div className="mb-8">
                                <SearchBar />
                            </div>
                            <Filters categories={categoriesData} genders={["Men", "Women", "Unisex"]} />
                        </div>
                    </aside>

                    {/* Mobile Filters Overlay */}
                    {showFilters && (
                        <div
                            className="lg:hidden fixed inset-0 z-50 bg-black/50"
                            onClick={() => setShowFilters(false)}
                        >
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute left-0 top-0 bottom-0 w-80 bg-[var(--bg-primary)] p-8 overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xs tracking-[0.2em] uppercase font-medium">Filters</h3>
                                    <button onClick={() => setShowFilters(false)}>
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <SearchBar />
                                <div className="mt-8">
                                    <Filters categories={categoriesData} genders={["Men", "Women", "Unisex"]} />
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="flex-grow">
                        <ProductGrid products={filteredProducts} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-[var(--text-primary)] border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <ProductsContent />
        </Suspense>
    );
}
