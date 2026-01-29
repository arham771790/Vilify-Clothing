"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductGrid from "../../components/ProductGrid";
import { searchProducts } from "../../utils/fetchProducts";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const results = searchProducts(query);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">Search Results</h1>
            {query && (
                <p className="text-gray-600 mb-8">
                    Showing results for: <span className="font-bold text-black">"{query}"</span>
                </p>
            )}
            <ProductGrid products={results} />
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
