import type { Address } from "./token";

export enum SupportedProtocolSlug {
    Morpho = "morpho",
}

export type ProtocolType = "yield-aggregator";

export interface MorphoCurator {
    address: Address;
    name?: string | null;
    url?: string | null;
}

export interface MorphoSourceData {
    type: "morpho";
    curator?: MorphoCurator | null;
    depositDisabled: boolean;
}

export type SourceData = MorphoSourceData;

export interface Protocol {
    slug: SupportedProtocolSlug;
    name: string;
    type: ProtocolType;
    data: SourceData;
}
