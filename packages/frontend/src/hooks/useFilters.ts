import { useQuery } from "@tanstack/react-query";
import type { OpportunitiesFiltersResponse } from "@yeelds/sdk";

import { YEELDS_API_CLIENT } from "@/src/commons";
import type { HookBaseParams } from "@/src/types/hooks";

export interface UseFiltersReturnValue {
    loading: boolean;
    filters: OpportunitiesFiltersResponse;
}

const EMPTY_FILTERS: OpportunitiesFiltersResponse = {
    chains: [],
    protocols: [],
    strategies: [],
};

export function useOpportunitiesFilters({
    enabled = true,
}: HookBaseParams = {}): UseFiltersReturnValue {
    const { data, isPending } = useQuery({
        queryKey: ["filters"],
        queryFn: async () => {
            try {
                return await YEELDS_API_CLIENT.fetchOpportunitiesFilters();
            } catch (error) {
                console.error(`Could not fetch filters: ${error}`, error);
                throw error;
            }
        },
        enabled,
    });

    return {
        loading: isPending,
        filters: data ?? EMPTY_FILTERS,
    };
}
