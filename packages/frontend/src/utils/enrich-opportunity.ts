import { SUPPORTED_PROTOCOLS } from "@yeelds/registry";
import {
    type Opportunity,
    type OpportunityAllocation,
    gradeFromScore,
} from "@yeelds/sdk";

import type {
    EnrichedOpportunity,
    EnrichedOpportunityAllocation,
} from "@/src/types/opportunity";

function withShares(
    allocations: OpportunityAllocation[],
): EnrichedOpportunityAllocation[] {
    // Any unpriced allocation makes the total unknown — percentages off a
    // partial book would read as complete.
    const total = allocations.reduce(
        (sum, allocation) =>
            sum === null || allocation.amountUsd == null
                ? null
                : sum + allocation.amountUsd,
        0 as number | null,
    );

    return allocations.map((allocation) => ({
        ...allocation,
        share:
            total && allocation.amountUsd != null
                ? (allocation.amountUsd / total) * 100
                : null,
    }));
}

export function enrichOpportunity(
    opportunity: Opportunity,
): EnrichedOpportunity {
    const protocolData = SUPPORTED_PROTOCOLS[opportunity.protocol.slug];
    if (!protocolData)
        console.error(
            `No registry data for protocol slug "${opportunity.protocol.slug}"`,
        );

    const apy = opportunity.apy * 100;
    // The API reports the organic (rewards-stripped) net APY directly; Morpho is
    // the only source that can omit it, in which case fall back to backing the
    // incentive APR out of the net APY.
    const apyExcludingRewards = opportunity.protocol.data.apyExcludingRewards;
    const rewardsAprFromTokens = opportunity.rewards.reduce(
        (sum, reward) => sum + (reward.apr != null ? reward.apr * 100 : 0),
        0,
    );
    const baseApy = Math.max(
        0,
        apyExcludingRewards != null
            ? apyExcludingRewards * 100
            : apy - rewardsAprFromTokens,
    );
    const totalRewardsApr = Math.max(0, apy - baseApy);

    return {
        ...opportunity,
        apy,
        baseApy,
        totalRewardsApr,
        allocations: withShares(opportunity.allocations),
        protocol: {
            ...opportunity.protocol,
            registry: protocolData
                ? {
                      icon: protocolData.icon,
                      url: protocolData.url,
                      buildDepositUrl: protocolData.buildDepositUrl,
                  }
                : undefined,
        },
        grade: opportunity.grade
            ? {
                  ...opportunity.grade,
                  letter: gradeFromScore(opportunity.grade.score),
              }
            : opportunity.grade,
    };
}
