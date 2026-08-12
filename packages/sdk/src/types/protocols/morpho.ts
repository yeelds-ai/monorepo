import type { SourceData } from "./common";

export interface MorphoCurator {
    address: string;
    name?: string | null;
    url?: string | null;
}

export type MorphoMarketWarningKind =
    | "unrecognized_oracle"
    | "unrecognized_oracle_feed"
    | "incorrect_oracle_configuration"
    | "oracle_price_derivation"
    | { other: string };

export type MorphoWarningLevel = "yellow" | "red";

export interface MorphoMarketWarning {
    kind: MorphoMarketWarningKind;
    level: MorphoWarningLevel;
}

export type MorphoOracleKind =
    "chainlink-oracle" | "chainlink-oracle-v2" | "custom-oracle" | "unknown";

export interface MorphoOracle {
    kind: MorphoOracleKind;
    baseFeeds: string[];
    baseVault?: string | null;
    quoteFeeds: string[];
    quoteVault?: string | null;
}

export interface MorphoAllocation {
    lltv: string;
    collateralAddress?: string | null;
    collateralSymbol?: string | null;
    oracle?: MorphoOracle | null;
    supplyUsd?: number | null;
    warnings: MorphoMarketWarning[];
}

export interface MorphoSourceData {
    type: "morpho";
    depositDisabled: boolean;
    allocations: MorphoAllocation[];
    curator?: MorphoCurator | null;
    apy30d?: number | null;
    apyExcludingRewards?: number | null;
    availableLiquidityUsd?: number | null;
    guardian?: string | null;
    owner?: string | null;
    timelockSeconds?: number | null;
}

export function isMorphoSourceData(data: SourceData): data is MorphoSourceData {
    return data.type === "morpho";
}
