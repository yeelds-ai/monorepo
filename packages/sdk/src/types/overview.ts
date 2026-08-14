import type { Opportunity } from "./opportunity";

export interface TvlPoint {
    capturedAt: string;
    grossUsd: number;
    netUsd: number;
    unquantifiedEdges: number;
}

export interface OverviewResponse {
    topGraded: Opportunity[];
    topStableYield: Opportunity[];
    deepestLiquidity: Opportunity[];
    topBlueChip: Opportunity[];
    highestApy: Opportunity[];
    tvl: TvlPoint[];
}
