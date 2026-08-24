import type { SourceData } from "./common";

export interface MorphoCurator {
    address: string;
    name?: string | null;
    url?: string | null;
}

export interface MorphoDeploy {
    address: string;
    assetsUsd?: number | null;
}

export interface MorphoSourceData {
    type: "morpho";
    depositDisabled: boolean;
    curator?: MorphoCurator | null;
    apy30d?: number | null;
    apyExcludingRewards?: number | null;
    availableLiquidityUsd?: number | null;
    deploysInto: MorphoDeploy[];
    guardian?: string | null;
    owner?: string | null;
    timelockSeconds?: number | null;
}

export function isMorphoSourceData(data: SourceData): data is MorphoSourceData {
    return data.type === "morpho";
}
