import { useTokenIcons } from "@/src/context/token-icons";

export interface UseTokenIconUrisReturnValue {
    loading: boolean;
    uris: Record<string, string>;
}

export function useTokenIconUris(
    chainId?: number,
    addresses?: (string | undefined)[],
): UseTokenIconUrisReturnValue {
    const { loading, icons } = useTokenIcons();

    const uris: Record<string, string> = {};
    if (chainId && addresses && icons)
        for (const address of addresses) {
            if (!address) continue;
            const uri = icons[chainId]?.[address.toLowerCase()];
            if (uri) uris[address] = uri;
        }

    return { loading, uris };
}
