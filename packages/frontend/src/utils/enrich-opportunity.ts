import { SUPPORTED_PROTOCOLS } from "@yeelds/registry";
import type { Opportunity } from "@yeelds/sdk";

import type { EnrichedOpportunity } from "@/src/types/opportunity";

export function enrichOpportunity(
    opportunity: Opportunity,
): EnrichedOpportunity {
    const protocolData = SUPPORTED_PROTOCOLS[opportunity.protocol.slug];
    if (!protocolData)
        console.error(
            `No registry data for protocol slug "${opportunity.protocol.slug}"`,
        );

    return {
        ...opportunity,
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
    };
}
