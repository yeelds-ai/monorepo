import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { FeedItem, FeedParams } from "@yeelds/sdk";

import { YEELDS_API_CLIENT } from "@/src/commons";
import type { HookBaseParams } from "@/src/types/hooks";

interface UseFeedParams extends HookBaseParams, FeedParams {}

export interface UseFeedReturnValue {
    loading: boolean;
    fetching: boolean;
    placeholderData: boolean;
    feedItems: FeedItem[];
    totalFeedItems: number;
}

export function useFeed({
    enabled = true,
    ...query
}: UseFeedParams = {}): UseFeedReturnValue {
    const {
        data,
        isPending,
        isFetching,
        isPlaceholderData: placeholderData,
    } = useQuery({
        queryKey: ["feed", query],
        queryFn: async () => {
            try {
                return await YEELDS_API_CLIENT.fetchFeed(query);
            } catch (error) {
                console.error(`Could not fetch feed: ${error}`, error);
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
        feedItems: data?.items ?? [],
        totalFeedItems: data?.totalItems ?? 0,
    };
}
