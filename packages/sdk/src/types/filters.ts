import type { Strategy } from "./opportunity";

export interface ChainFilter {
    id: number;
    slug: string;
    name: string;
    type: string;
}

export interface ProtocolFilter {
    slug: string;
    name: string;
}

export interface StrategyFilter {
    slug: Strategy;
    name: string;
}

export interface OpportunitiesFiltersResponse {
    chains: ChainFilter[];
    protocols: ProtocolFilter[];
    strategies: StrategyFilter[];
}
