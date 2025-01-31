"use client";

import React, { useEffect, useRef, useState } from "react";
import CryptoCard from "@/components/CryptoCard";
import { useTokenStore } from "@/app/store/useTokenStore";

// Debounce the search
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Unmount when the value changes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const TokenList: React.FC = () => {
    const { tokens, loading, hasMore, fetchTokens } = useTokenStore();
    const loaderRef = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        fetchTokens();
    }, [fetchTokens]);

    // IntersectionObserver to detect when we reach the bottom of the list
    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !loading) {
                    // Fetch the next set of tokens
                    fetchTokens();
                }
            },
            { rootMargin: "20px" }
        );

        observer.observe(loaderRef.current);

        return () => {
            observer.disconnect();
        };
    }, [hasMore, loading, fetchTokens]);

    // Filter tokens based on the debounced search query
    const filteredTokens = tokens.filter((token) =>
        token.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Search Cryptocurrency Tokens</h2>

                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Search tokens by name..."
                        className="p-3 w-full max-w-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black pr-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 text-xl"
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {filteredTokens.map((token) => (
                <CryptoCard key={token.rank} {...token} />
            ))}

            <div ref={loaderRef} className="h-16" />
        </div>
    );
};

export default TokenList;
