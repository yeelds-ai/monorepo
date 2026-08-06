"use client";

import { useQuery } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext, useMemo } from "react";

import { TOKEN_ICONS_URL } from "@/src/commons";

type TokenIcons = Record<number, Record<string, string>>;

interface TokenIconsContextValue {
    loading: boolean;
    icons?: TokenIcons;
}

const TokenIconsContext = createContext<TokenIconsContextValue | null>(null);

interface TokenIconsProviderProps {
    children: ReactNode;
}

export function TokenIconsProvider({ children }: TokenIconsProviderProps) {
    const { data: icons, isPending: loading } = useQuery({
        queryKey: ["tokenIcons"],
        queryFn: async () => {
            try {
                const response = await fetch(TOKEN_ICONS_URL);
                if (!response.ok) throw new Error(await response.text());
                return (await response.json()) as TokenIcons;
            } catch (error) {
                console.error(`Could not fetch token icons: ${error}`, error);
                throw error;
            }
        },
        staleTime: 86_400_000,
    });

    const value = useMemo(() => ({ icons, loading }), [icons, loading]);

    return (
        <TokenIconsContext.Provider value={value}>
            {children}
        </TokenIconsContext.Provider>
    );
}

export function useTokenIcons(): TokenIconsContextValue {
    const context = useContext(TokenIconsContext);
    if (!context)
        throw new Error(
            "useTokenIcons must be used within a TokenIconsProvider",
        );
    return context;
}
