import type { OpportunityGrade } from "./grade";
import type { Protocol } from "./protocols";
import type { Token } from "./token";

export type Strategy = "vault" | "lending";

export type SortField = "apy" | "tvl" | "score";

export type SortDirection = "asc" | "desc";

export interface OnChainContract {
    ageDays?: number | null;
    scam: boolean;
    verified: boolean;
}

export interface OnChainToken {
    holdersCount: number;
    topHolderConcentration: number;
}

export interface OnChainData {
    contract: OnChainContract;
    token?: OnChainToken | null;
}

export interface OpportunityAsset {
    token: Token;
    amount: string;
    amountUsd?: number | null;
}

export interface OpportunityReward {
    token: Token;
    apr?: number | null;
}

export interface Opportunity {
    chain: string;
    address: string;
    name: string;
    protocol: Protocol;
    strategy: Strategy;
    apy: number;
    assets: OpportunityAsset[];
    rewards: OpportunityReward[];
    tvlUsd?: number | null;
    onChain?: OnChainData | null;
    grade?: OpportunityGrade | null;
}

export type OpportunityResponse = Opportunity | null;

export interface PaginatedOpportunitiesResponse {
    opportunities: Opportunity[];
    totalItems: number;
}
