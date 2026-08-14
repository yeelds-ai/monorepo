import { useQuery } from "@tanstack/react-query";
import type { GraphNode, OpportunityRelationship } from "@yeelds/sdk";

import { YEELDS_API_CLIENT } from "@/src/commons";
import type { HookBaseParams } from "@/src/types/hooks";

export interface UseOpportunitiesGraphReturnValue {
    loading: boolean;
    fetching: boolean;
    nodes: GraphNode[];
    edges: OpportunityRelationship[];
}

export function useOpportunitiesGraph({
    enabled = true,
}: HookBaseParams = {}): UseOpportunitiesGraphReturnValue {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ["opportunities-graph"],
        queryFn: async () => {
            try {
                return await YEELDS_API_CLIENT.fetchOpportunitiesGraph();
            } catch (error) {
                console.error(
                    `Could not fetch opportunities graph: ${error}`,
                    error,
                );
                throw error;
            }
        },
        enabled,
    });

    return {
        loading: isPending,
        fetching: isFetching,
        nodes: data?.nodes ?? [],
        edges: data?.edges ?? [],
    };
}
