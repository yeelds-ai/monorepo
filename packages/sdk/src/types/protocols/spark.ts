import type { SourceData } from "./common";

export interface SparkUnderlying {
    address: string;
    symbol: string;
}

export interface SparkIncentive {
    apr: number;
    rewardTokenAddress: string;
    rewardTokenSymbol: string;
}

export interface SparkSourceData {
    type: "spark";
    market: string;
    underlying: SparkUnderlying;
    availableLiquidityUsd: number;
    timelockSeconds: number;
    apyExcludingRewards: number;
    incentives: SparkIncentive[];
}

export function isSparkSourceData(data: SourceData): data is SparkSourceData {
    return data.type === "spark";
}
