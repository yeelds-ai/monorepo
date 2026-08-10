import type { ProtocolData } from "@yeelds/registry";
import type {
    GradeLetter,
    Opportunity,
    OpportunityGrade,
    Protocol,
} from "@yeelds/sdk";

export interface EnrichedProtocol extends Protocol {
    registry?: Omit<ProtocolData, "slug" | "name">;
}

export interface EnrichedOpportunityGrade extends OpportunityGrade {
    letter: GradeLetter;
}

export interface EnrichedOpportunity extends Omit<
    Opportunity,
    "protocol" | "grade"
> {
    protocol: EnrichedProtocol;
    grade?: EnrichedOpportunityGrade | null;
}
