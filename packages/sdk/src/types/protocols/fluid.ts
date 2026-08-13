import type { SourceData } from "./common";

export interface FluidUnderlying {
    address: string;
    symbol: string;
}

export interface FluidSourceData {
    type: "fluid";
    underlying: FluidUnderlying;
    sizeUsd: number;
    availableLiquidityUsd: number;
    timelockSeconds: number;
    apyExcludingRewards: number;
    rewardsApr: number;
}

export function isFluidSourceData(data: SourceData): data is FluidSourceData {
    return data.type === "fluid";
}
