import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";
import { aaveData } from "./aave";
import { morphoData } from "./morpho";

export * from "./morpho";
export * from "./aave";

export const SUPPORTED_PROTOCOLS: Record<
    SupportedProtocolSlug,
    ProtocolData | undefined
> = {
    [SupportedProtocolSlug.Aave]: aaveData,
    [SupportedProtocolSlug.Morpho]: morphoData,
};
