import type { PaginatedFeedResponse } from "../types/feed";
import type { OpportunitiesFiltersResponse } from "../types/filters";
import type { OpportunitiesHighlightsResponse } from "../types/highlights";
import type {
    OpportunityResponse,
    PaginatedOpportunitiesResponse,
    SortDirection,
    SortField,
    Strategy,
} from "../types/opportunity";

export interface FeedParams {
    page?: number;
    pageSize?: number;
    publications?: string[];
}

export interface OpportunitiesParams {
    page?: number;
    pageSize?: number;
    chains?: string[];
    protocols?: string[];
    strategies?: Strategy[];
    tvlFrom?: number;
    tvlTo?: number;
    apyFrom?: number;
    apyTo?: number;
    minScore?: number;
    sort?: SortField;
    direction?: SortDirection;
}

export interface OpportunityParams {
    chain: string;
    address: string;
}

export class YeeldsApiClient {
    constructor(
        public readonly baseUrl: string,
        private readonly headers?: HeadersInit,
    ) {}

    async fetchFeed(query: FeedParams = {}): Promise<PaginatedFeedResponse> {
        const url = new URL("v1/feed", this.baseUrl);

        const params: FeedParams = {
            ...query,
            page: query.page ?? 1,
            pageSize: query.pageSize ?? 15,
        };

        for (const param in params) {
            const value = params[param as keyof FeedParams];
            if (value === undefined) continue;

            if (Array.isArray(value)) {
                if (value.length === 0) continue;
                url.searchParams.set(param, value.join(","));
            } else url.searchParams.set(param, value.toString());
        }

        const response = await fetch(url, { headers: this.headers });
        if (!response.ok)
            throw new Error(
                `Response not ok while fetching feed: ${await response.text()}`,
            );

        return (await response.json()) as PaginatedFeedResponse;
    }

    async fetchOpportunities(
        query: OpportunitiesParams = {},
    ): Promise<PaginatedOpportunitiesResponse> {
        const url = new URL("v1/opportunities", this.baseUrl);

        const params: OpportunitiesParams = {
            ...query,
            page: query.page ?? 1,
            pageSize: query.pageSize ?? 15,
        };

        for (const param in params) {
            const value = params[param as keyof OpportunitiesParams];
            if (value === undefined) continue;

            if (Array.isArray(value)) {
                if (value.length === 0) continue;
                url.searchParams.set(param, value.join(","));
            } else url.searchParams.set(param, value.toString());
        }

        const response = await fetch(url, { headers: this.headers });
        if (!response.ok)
            throw new Error(
                `Response not ok while fetching opportunities: ${await response.text()}`,
            );

        return (await response.json()) as PaginatedOpportunitiesResponse;
    }

    async fetchOpportunity({
        chain,
        address,
    }: OpportunityParams): Promise<OpportunityResponse> {
        const url = new URL(
            `v1/opportunities/${encodeURIComponent(chain)}/${encodeURIComponent(address)}`,
            this.baseUrl,
        );

        const response = await fetch(url, { headers: this.headers });
        if (response.status === 404) return null;
        if (!response.ok)
            throw new Error(
                `Response not ok while fetching opportunity: ${await response.text()}`,
            );

        return (await response.json()) as OpportunityResponse;
    }

    async fetchOpportunitiesFilters(): Promise<OpportunitiesFiltersResponse> {
        const response = await fetch(
            new URL("v1/opportunities/filters", this.baseUrl),
            { headers: this.headers },
        );
        if (!response.ok)
            throw new Error(
                `Response not ok while fetching filters: ${await response.text()}`,
            );

        return (await response.json()) as OpportunitiesFiltersResponse;
    }

    async fetchOpportunitiesHighlights(): Promise<OpportunitiesHighlightsResponse> {
        const response = await fetch(
            new URL("v1/opportunities/highlights", this.baseUrl),
            { headers: this.headers },
        );
        if (!response.ok)
            throw new Error(
                `Response not ok while fetching highlights: ${await response.text()}`,
            );

        return (await response.json()) as OpportunitiesHighlightsResponse;
    }
}
