import type { Protocol } from "./protocol";
import type { Address, Token, U256 } from "./token";

export type Strategy = "vault";

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
    amount: U256;
    amountUsd?: number | null;
}

export interface OpportunityReward {
    token: Token;
    apr?: number | null;
}

export interface Opportunity {
    chain: string;
    address: Address;
    name: string;
    protocol: Protocol;
    strategy: Strategy;
    apy: number;
    assets: OpportunityAsset[];
    rewards: OpportunityReward[];
    tvlUsd?: number | null;
    onChain?: OnChainData | null;
}

export type OpportunityResponse = Opportunity | null;

export interface PaginatedOpportunitiesResponse {
    opportunities: Opportunity[];
    totalItems: number;
}
