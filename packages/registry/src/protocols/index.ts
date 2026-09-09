import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";
import { aaveData } from "./aave";
import { fluidData } from "./fluid";
import { lidoData } from "./lido";
import { morphoData } from "./morpho";
import { pendleData } from "./pendle";
import { sparkData } from "./spark";
import { yearnData } from "./yearn";

export * from "./aave";
export * from "./fluid";
export * from "./lido";
export * from "./morpho";
export * from "./pendle";
export * from "./spark";
export * from "./yearn";

export const SUPPORTED_PROTOCOLS: Record<
    SupportedProtocolSlug,
    ProtocolData | undefined
> = {
    [SupportedProtocolSlug.Aave]: aaveData,
    [SupportedProtocolSlug.Fluid]: fluidData,
    [SupportedProtocolSlug.Morpho]: morphoData,
    [SupportedProtocolSlug.Pendle]: pendleData,
    [SupportedProtocolSlug.Yearn]: yearnData,
    [SupportedProtocolSlug.Spark]: sparkData,
    [SupportedProtocolSlug.Lido]: lidoData,
};
