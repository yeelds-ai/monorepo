import type { ProtocolData } from "@yeelds/registry";
import type { Opportunity, Protocol } from "@yeelds/sdk";

export interface EnrichedProtocol extends Protocol {
    registry?: Omit<ProtocolData, "slug" | "name">;
}

export interface EnrichedOpportunity extends Omit<Opportunity, "protocol"> {
    protocol: EnrichedProtocol;
}
