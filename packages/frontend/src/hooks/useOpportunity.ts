import { useQuery } from "@tanstack/react-query";

import { YEELDS_API_CLIENT } from "@/src/commons";
import type { HookBaseParams } from "@/src/types/hooks";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { enrichOpportunity } from "@/src/utils/enrich-opportunity";

interface UseOpportunityParams extends HookBaseParams {
    chain: string;
    address: string;
}

export interface UseOpportunityReturnValue {
    loading: boolean;
    fetching: boolean;
    opportunity: EnrichedOpportunity | null;
    notFound: boolean;
}

export function useOpportunity({
    chain,
    address,
    enabled = true,
}: UseOpportunityParams): UseOpportunityReturnValue {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ["opportunity", chain, address],
        queryFn: async () => {
            try {
                return await YEELDS_API_CLIENT.fetchOpportunity({
                    chain,
                    address,
                });
            } catch (error) {
                console.error(
                    `Could not fetch opportunity ${chain}/${address}: ${error}`,
                    error,
                );
                throw error;
            }
        },
        enabled: enabled && !!chain && !!address,
    });

    return {
        loading: isPending,
        fetching: isFetching,
        opportunity: data ? enrichOpportunity(data) : null,
        notFound: !isPending && data === null,
    };
}
