import type { SourceData } from "./common";

export interface YearnUnderlying {
    address: string;
    symbol: string;
}

export interface YearnDeploy {
    address: string;
    assetsUsd?: number | null;
}

export interface YearnSourceData {
    type: "yearn";
    underlying: YearnUnderlying;
    isShutdown: boolean;
    timelockSeconds: number;
    apyExcludingRewards: number;
    deploysInto: YearnDeploy[];
}

export function isYearnSourceData(data: SourceData): data is YearnSourceData {
    return data.type === "yearn";
}
