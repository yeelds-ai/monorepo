import type { ChainData } from "../types/chain";
import { arbitrumData } from "./arbitrum";
import { baseData } from "./base";
import { ethereumData } from "./ethereum";

export * from "./arbitrum";
export * from "./base";
export * from "./ethereum";

export const SUPPORTED_CHAINS: Record<string, ChainData | undefined> = {
    [ethereumData.slug]: ethereumData,
    [arbitrumData.slug]: arbitrumData,
    [baseData.slug]: baseData,
};
