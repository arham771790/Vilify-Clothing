"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function Filters({ categories, genders }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleFilterChange = (key, value) => {
        router.push(pathname + "?" + createQueryString(key, value));
    };

    const currentCategory = searchParams.get("category");
    const currentGender = searchParams.get("gender");

    return (
        <div className="space-y-12">
            {/* Categories */}
            <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold mb-6 text-[var(--text-muted)]">
                    By Category
                </h4>
                <div className="space-y-4">
                    <button
                        onClick={() => handleFilterChange("category", "")}
                        className={`block text-xs uppercase tracking-widest transition-colors ${!currentCategory ? "text-[var(--text-primary)] font-bold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        All Items
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleFilterChange("category", cat.name)}
                            className={`block text-xs uppercase tracking-widest transition-colors ${currentCategory === cat.name ? "text-[var(--text-primary)] font-bold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gender */}
            <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold mb-6 text-[var(--text-muted)]">
                    By Gender
                </h4>
                <div className="space-y-4">
                    <button
                        onClick={() => handleFilterChange("gender", "")}
                        className={`block text-xs uppercase tracking-widest transition-colors ${!currentGender ? "text-[var(--text-primary)] font-bold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        All
                    </button>
                    {genders.map((g) => (
                        <button
                            key={g}
                            onClick={() => handleFilterChange("gender", g)}
                            className={`block text-xs uppercase tracking-widest transition-colors ${currentGender === g ? "text-[var(--text-primary)] font-bold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                }`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            {(currentCategory || currentGender) && (
                <button
                    onClick={() => router.push(pathname)}
                    className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors pt-4 border-t border-[var(--border-color)] w-full text-left"
                >
                    Reset Filters
                </button>
            )}
        </div>
    );
}
