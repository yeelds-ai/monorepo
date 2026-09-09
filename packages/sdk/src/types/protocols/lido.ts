import type { SourceData } from "./common";

export interface LidoUnderlying {
    address: string;
    symbol: string;
}

export interface LidoSourceData {
    type: "lido";
    underlying: LidoUnderlying;
    sizeUsd: number;
    availableLiquidityUsd: number;
    timelockSeconds: number;
    apy: number;
}

export function isLidoSourceData(data: SourceData): data is LidoSourceData {
    return data.type === "lido";
}
