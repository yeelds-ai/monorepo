import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { OpportunityTvlPoint } from "@yeelds/sdk";

import { YEELDS_API_CLIENT } from "@/src/commons";
import type { HookBaseParams } from "@/src/types/hooks";

interface UseOpportunityTvlParams extends HookBaseParams {
    chain: string;
    address: string;
    from?: string;
    staleTime?: number;
}

export interface UseOpportunityTvlReturnValue {
    loading: boolean;
    fetching: boolean;
    placeholderData: boolean;
    tvl: OpportunityTvlPoint[];
}

export function useOpportunityTvl({
    chain,
    address,
    from,
    staleTime,
    enabled = true,
}: UseOpportunityTvlParams): UseOpportunityTvlReturnValue {
    const {
        data,
        isPending,
        isFetching,
        isPlaceholderData: placeholderData,
    } = useQuery({
        queryKey: ["opportunity-tvl", chain, address, from],
        queryFn: async () => {
            try {
                return await YEELDS_API_CLIENT.fetchOpportunityTvl({
                    chain,
                    address,
                    from,
                });
            } catch (error) {
                console.error(
                    `Could not fetch opportunity TVL for ${chain}/${address}: ${error}`,
                    error,
                );
                throw error;
            }
        },
        placeholderData: keepPreviousData,
        staleTime,
        enabled: enabled && !!chain && !!address,
    });

    return {
        loading: isPending,
        fetching: isFetching,
        placeholderData,
        tvl: data ?? [],
    };
}
