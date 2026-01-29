"use client";

import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative mb-12">
            <input
                type="text"
                placeholder="SEARCH..."
                className="w-full border-b border-[var(--border-color)] pl-0 pr-10 py-3 text-xs tracking-[0.2em] uppercase bg-transparent focus:outline-none focus:border-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)] mt-1"
                defaultValue={searchParams.get("search")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        </div>
    );
}
