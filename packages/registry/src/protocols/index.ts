import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";
import { aaveData } from "./aave";
import { fluidData } from "./fluid";
import { morphoData } from "./morpho";
import { pendleData } from "./pendle";

export * from "./aave";
export * from "./fluid";
export * from "./morpho";
export * from "./pendle";

export const SUPPORTED_PROTOCOLS: Record<
    SupportedProtocolSlug,
    ProtocolData | undefined
> = {
    [SupportedProtocolSlug.Aave]: aaveData,
    [SupportedProtocolSlug.Fluid]: fluidData,
    [SupportedProtocolSlug.Morpho]: morphoData,
    [SupportedProtocolSlug.Pendle]: pendleData,
};
