import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { OverviewParams, TvlPoint } from "@yeelds/sdk";

import { YEELDS_API_CLIENT } from "@/src/commons";
import type { HookBaseParams } from "@/src/types/hooks";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { enrichOpportunity } from "@/src/utils/enrich-opportunity";

interface UseOverviewParams extends HookBaseParams, OverviewParams {}

export interface UseOverviewReturnValue {
    loading: boolean;
    fetching: boolean;
    placeholderData: boolean;
    topGraded: EnrichedOpportunity[];
    topStableYield: EnrichedOpportunity[];
    deepestLiquidity: EnrichedOpportunity[];
    topBlueChip: EnrichedOpportunity[];
    highestApy: EnrichedOpportunity[];
    tvl: TvlPoint[];
}

export function useOverview({
    enabled = true,
    ...query
}: UseOverviewParams = {}): UseOverviewReturnValue {
    const {
        data,
        isPending,
        isFetching,
        isPlaceholderData: placeholderData,
    } = useQuery({
        queryKey: ["overview", query],
        queryFn: async () => {
            try {
                return await YEELDS_API_CLIENT.fetchOverview(query);
            } catch (error) {
                console.error(`Could not fetch overview: ${error}`, error);
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
        topGraded: data?.topGraded?.map(enrichOpportunity) ?? [],
        topStableYield: data?.topStableYield?.map(enrichOpportunity) ?? [],
        deepestLiquidity: data?.deepestLiquidity?.map(enrichOpportunity) ?? [],
        topBlueChip: data?.topBlueChip?.map(enrichOpportunity) ?? [],
        highestApy: data?.highestApy?.map(enrichOpportunity) ?? [],
        tvl: data?.tvl ?? [],
    };
}
