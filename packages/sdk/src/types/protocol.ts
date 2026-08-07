export enum SupportedProtocolSlug {
    Morpho = "morpho",
}

export type ProtocolType = "yield-aggregator";

export interface MorphoCurator {
    address: string;
    name?: string | null;
    url?: string | null;
}

export interface MorphoMarketWarning {
    kind: string;
    level: string;
}

export interface MorphoOracle {
    kind: string;
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

export type SourceData = MorphoSourceData;

export interface Protocol {
    slug: SupportedProtocolSlug;
    name: string;
    type: ProtocolType;
    data: SourceData;
}
