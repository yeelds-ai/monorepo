"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

import { TokenIconsProvider } from "@/src/context/token-icons";

interface ClientProvidersProps {
    children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
    // Created in state, not at module scope: a module-level client is shared
    // across requests on the server and would leak one user's cache into
    // another's render.
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <TokenIconsProvider>{children}</TokenIconsProvider>
        </QueryClientProvider>
    );
}
