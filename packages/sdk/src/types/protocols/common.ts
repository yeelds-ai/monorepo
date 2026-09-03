import type { AaveSourceData } from "./aave";
import type { FluidSourceData } from "./fluid";
import type { MorphoSourceData } from "./morpho";
import type { PendleSourceData } from "./pendle";

export enum SupportedProtocolSlug {
    Morpho = "morpho",
    Aave = "aave",
    Fluid = "fluid",
    Pendle = "pendle",
}

export type ProtocolType = "yield-aggregator" | "lending";

export type SourceData =
    MorphoSourceData | AaveSourceData | FluidSourceData | PendleSourceData;

export interface Protocol {
    slug: SupportedProtocolSlug;
    name: string;
    type: ProtocolType;
    data: SourceData;
}
