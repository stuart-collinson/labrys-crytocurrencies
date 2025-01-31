"use client";

import React, { useEffect, useRef } from "react";
import CryptoCard from "@/components/CryptoCard";
import { useTokenStore } from "@/app/store/useTokenStore";

const TokenList: React.FC = () => {
    const { tokens, loading, hasMore, fetchTokens } = useTokenStore();
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTokens();
    }, [fetchTokens]);

    //IntersectionObserver to detect when we reach the bottom of the list
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

    return (
        <div className="space-y-4">
            {tokens.map((token) => (
                <CryptoCard key={token.rank} {...token} />
            ))}

            {/* {loading && (
            <div className="text-center text-gray-500">Loading more tokens...</div>
            )} */}

            {/* <div ref={loaderRef} className="h-16" /> */}
        </div>
    );
};

export default TokenList;
