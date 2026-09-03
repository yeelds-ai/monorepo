import type { SourceData } from "./common";

export type PendleLeg = "principal-token" | "pool";

export interface PendleUnderlying {
    address: string;
    symbol: string;
}

export interface PendleSourceData {
    type: "pendle";
    leg: PendleLeg;
    underlying: PendleUnderlying;
    market: string;
    principalToken: string;
    standardizedYieldToken: string;
    expiry: string;
    impliedApy: number;
    underlyingApy: number;
    liquidityUsd: number;
    poolPrincipalTokenUsd: number;
    timelockSeconds: number;
    apyExcludingRewards: number;
    volatileUnderlying: boolean;
    categories: string[];
}

export function isPendleSourceData(data: SourceData): data is PendleSourceData {
    return data.type === "pendle";
}
