import type { AaveSourceData } from "./aave";
import type { FluidSourceData } from "./fluid";
import type { LidoSourceData } from "./lido";
import type { MorphoSourceData } from "./morpho";
import type { PendleSourceData } from "./pendle";
import type { SparkSourceData } from "./spark";
import type { YearnSourceData } from "./yearn";

export enum SupportedProtocolSlug {
    Morpho = "morpho",
    Aave = "aave",
    Fluid = "fluid",
    Pendle = "pendle",
    Yearn = "yearn",
    Spark = "spark",
    Lido = "lido",
}

export type ProtocolType = "yield-aggregator" | "lending" | "staking";

export type SourceData =
    | MorphoSourceData
    | AaveSourceData
    | FluidSourceData
    | PendleSourceData
    | YearnSourceData
    | SparkSourceData
    | LidoSourceData;

export interface Protocol {
    slug: SupportedProtocolSlug;
    name: string;
    type: ProtocolType;
    data: SourceData;
}
