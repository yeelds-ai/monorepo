import type { Opportunity } from "./opportunity";

export interface OpportunitiesHighlightsResponse {
    topGraded: Opportunity[];
    topStableYield: Opportunity[];
    deepestLiquidity: Opportunity[];
    topBlueChip: Opportunity[];
    highestApy: Opportunity[];
}
