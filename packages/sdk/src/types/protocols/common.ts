import type { AaveSourceData } from "./aave";
import type { MorphoSourceData } from "./morpho";

export enum SupportedProtocolSlug {
    Morpho = "morpho",
    Aave = "aave",
}

export type ProtocolType = "yield-aggregator" | "lending";

export type SourceData = MorphoSourceData | AaveSourceData;

export interface Protocol {
    slug: SupportedProtocolSlug;
    name: string;
    type: ProtocolType;
    data: SourceData;
}
