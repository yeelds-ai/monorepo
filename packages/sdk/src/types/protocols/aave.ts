import type { SourceData } from "./common";

export type AaveIncentiveKind = "merit" | "native" | "merkl";

export interface AaveIncentive {
    apr: number;
    kind: AaveIncentiveKind;
    rewardTokenAddress?: string | null;
    rewardTokenSymbol?: string | null;
}

export interface AaveMarketInfo {
    name: string;
    address: string;
}

export interface AaveSupplyCap {
    reached: boolean;
    usd?: number | null;
}

export interface AaveUnderlying {
    address: string;
    symbol: string;
}

export interface AaveSourceData {
    type: "aave";
    market: AaveMarketInfo;
    underlying: AaveUnderlying;
    supplyCap: AaveSupplyCap;
    availableLiquidityUsd: number;
    timelockSeconds: number;
    apyExcludingRewards: number;
    incentives: AaveIncentive[];
    utilizationRate?: number | null;
}

export function isAaveSourceData(data: SourceData): data is AaveSourceData {
    return data.type === "aave";
}
