import { useQuery } from "@tanstack/react-query";
import type { Stats } from "@yeelds/sdk";

import { YEELDS_API_CLIENT } from "@/src/commons";
import type { HookBaseParams } from "@/src/types/hooks";

export interface UseStatsReturnValue {
    loading: boolean;
    stats: Stats;
}

const EMPTY_STATS: Stats = {
    totalOpportunities: 0,
    totalTvlUsd: 0,
    chainsCovered: 0,
    protocolsCovered: 0,
};

export function useStats({
    enabled = true,
}: HookBaseParams = {}): UseStatsReturnValue {
    const { data, isPending } = useQuery({
        queryKey: ["stats"],
        queryFn: async () => {
            try {
                return await YEELDS_API_CLIENT.fetchStats();
            } catch (error) {
                console.error(`Could not fetch stats: ${error}`, error);
                throw error;
            }
        },
        enabled,
    });

    return {
        loading: isPending,
        stats: data ?? EMPTY_STATS,
    };
}
