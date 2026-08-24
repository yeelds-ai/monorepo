import type { ProtocolData } from "@yeelds/registry";
import type {
    GradeLetter,
    Opportunity,
    OpportunityAllocation,
    OpportunityGrade,
    Protocol,
} from "@yeelds/sdk";

export interface EnrichedProtocol extends Protocol {
    registry?: Omit<ProtocolData, "slug" | "name">;
}

export interface EnrichedOpportunityGrade extends OpportunityGrade {
    letter: GradeLetter;
}

export interface EnrichedOpportunityAllocation extends OpportunityAllocation {
    share: number | null;
}

export interface EnrichedOpportunity extends Omit<
    Opportunity,
    "protocol" | "grade" | "allocations"
> {
    protocol: EnrichedProtocol;
    grade?: EnrichedOpportunityGrade | null;
    allocations: EnrichedOpportunityAllocation[];
}
