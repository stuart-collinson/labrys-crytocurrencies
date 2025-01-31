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

    const [sortBy, setSortBy] = useState<string>("rank");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    enum ESortTypes {
        RANK = "rank",
        NAME = "name",
        PRICE = "price",
        DAILY_PERCENTAGE = "dailyPercentage"
    }

    useEffect(() => {
        fetchTokens();
    }, [fetchTokens]);

    // IntersectionObserver to detect when we reach the bottom of the list
    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !loading) {
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

    // Sorting function
    const sortedTokens = [...filteredTokens].sort((a, b) => {
        switch (sortBy as ESortTypes) {
            case ESortTypes.RANK:
                return sortDirection === "asc" ? a.rank - b.rank : b.rank - a.rank;

            case ESortTypes.NAME:
                return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);

            case ESortTypes.PRICE:
                return sortDirection === "asc" ? parseFloat(a.price) - parseFloat(b.price) : parseFloat(b.price) - parseFloat(a.price);

            case ESortTypes.DAILY_PERCENTAGE:
                return sortDirection === "asc" ? parseFloat(a.dailyPercentage) - parseFloat(b.dailyPercentage) : parseFloat(b.dailyPercentage) - parseFloat(a.dailyPercentage);

            default:
                return 0;
        }
    });

    // Handle the sorting logic when a column header is clicked
    const handleSort = (column: string) => {
        if (column === sortBy) {
            // If the column is already sorted, toggle the sort direction
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            // Otherwise, set the column to sort and default to ascending
            setSortBy(column);
            setSortDirection("asc");
        }
    };

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

            {/* Table Header for Sorting */}
            <div className="overflow-x-auto">
                <div className="grid grid-cols-4 gap-4 font-semibold cursor-pointer">
                    <div
                        onClick={() => handleSort("rank")}
                        className="p-2 flex items-center justify-between"
                    >
                        Rank
                        {sortBy === "rank" && (
                            <span className={`text-${sortDirection === "asc" ? "purple-500" : "purple-700"}`}>{sortDirection === "asc" ? "▲" : "▼"}</span>
                        )}
                    </div>
                    <div
                        onClick={() => handleSort("name")}
                        className="p-2 flex items-center justify-between"
                    >
                        Name
                        {sortBy === "name" && (
                            <span className={`text-${sortDirection === "asc" ? "purple-500" : "purple-700"}`}>{sortDirection === "asc" ? "▲" : "▼"}</span>
                        )}
                    </div>
                    <div
                        onClick={() => handleSort("price")}
                        className="p-2 flex items-center justify-between"
                    >
                        Price (USD)
                        {sortBy === "price" && (
                            <span className={`text-${sortDirection === "asc" ? "purple-500" : "purple-700"}`}>{sortDirection === "asc" ? "▲" : "▼"}</span>
                        )}
                    </div>
                    <div
                        onClick={() => handleSort("dailyPercentage")}
                        className="p-2 flex items-center justify-between"
                    >
                        24h Change (%)
                        {sortBy === "dailyPercentage" && (
                            <span className={`text-${sortDirection === "asc" ? "purple-500" : "purple-700"}`}>{sortDirection === "asc" ? "▲" : "▼"}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Render the filtered and sorted tokens as CryptoCard components */}
            {sortedTokens.map((token) => (
                <CryptoCard key={token.rank} {...token} />
            ))}

            <div ref={loaderRef} className="h-16" />
        </div>
    );
};

export default TokenList;
