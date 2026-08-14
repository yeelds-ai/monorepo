export type RelationshipKind = "deposit";

export interface GraphNode {
    chain: string;
    address: string;
    name: string;
    protocol: string;
    apy: number;
    tvlUsd?: number | null;
}

export interface OpportunityRelationship {
    fromChain: string;
    fromAddress: string;
    toChain: string;
    toAddress: string;
    kind: RelationshipKind;
    amountUsd?: number | null;
}

export interface OpportunitiesGraphResponse {
    nodes: GraphNode[];
    edges: OpportunityRelationship[];
}
