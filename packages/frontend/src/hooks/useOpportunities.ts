import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { OpportunitiesParams } from "@yeelds/sdk";

import { YEELDS_API_CLIENT } from "@/src/commons";
import type { HookBaseParams } from "@/src/types/hooks";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { enrichOpportunity } from "@/src/utils/enrich-opportunity";

interface UseOpportunitiesParams extends HookBaseParams, OpportunitiesParams {}

export interface UseOpportunitiesReturnValue {
    loading: boolean;
    fetching: boolean;
    placeholderData: boolean;
    opportunities: EnrichedOpportunity[];
    totalOpportunities: number;
}

export function useOpportunities({
    enabled = true,
    ...query
}: UseOpportunitiesParams = {}): UseOpportunitiesReturnValue {
    const {
        data,
        isPending,
        isFetching,
        isPlaceholderData: placeholderData,
    } = useQuery({
        queryKey: ["opportunities", query],
        queryFn: async () => {
            try {
                return await YEELDS_API_CLIENT.fetchOpportunities({
                    ...query,
                    apyFrom:
                        query.apyFrom !== undefined
                            ? query.apyFrom / 100
                            : undefined,
                    apyTo:
                        query.apyTo !== undefined
                            ? query.apyTo / 100
                            : undefined,
                });
            } catch (error) {
                console.error(`Could not fetch opportunities: ${error}`, error);
                throw error;
            }
        },
        placeholderData: keepPreviousData,
        enabled,
    });

    return {
        loading: isPending,
        fetching: isFetching,
        placeholderData,
        opportunities: data?.opportunities?.map(enrichOpportunity) ?? [],
        totalOpportunities: data?.totalItems ?? 0,
    };
}
