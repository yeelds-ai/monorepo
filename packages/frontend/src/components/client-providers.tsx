"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { hashFn } from "wagmi/query";

import { EvmWalletProvider } from "@/src/context/evm-wallet-provider";
import { TokenIconsProvider } from "@/src/context/token-icons";

interface ClientProvidersProps {
    children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
    // Created in state, not at module scope: a module-level client is shared
    // across requests on the server and would leak one user's cache into
    // another's render.
    //
    // queryKeyHashFn is wagmi's, its query keys hold BigInt values that the
    // default JSON-based hash can't serialize.
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: { queries: { queryKeyHashFn: hashFn } },
            }),
    );

    return (
        <EvmWalletProvider>
            <QueryClientProvider client={queryClient}>
                <TokenIconsProvider>{children}</TokenIconsProvider>
            </QueryClientProvider>
        </EvmWalletProvider>
    );
}
