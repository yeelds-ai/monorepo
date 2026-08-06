import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";
import { morphoData } from "./morpho";

export * from "./morpho";

export const SUPPORTED_PROTOCOLS: Record<
    SupportedProtocolSlug,
    ProtocolData | undefined
> = {
    [SupportedProtocolSlug.Morpho]: morphoData,
};
