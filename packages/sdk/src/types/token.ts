export type StablecoinPegMechanism =
    "fiat-backed" | "crypto-backed" | "rwa-backed" | "algorithmic" | "unknown";

export type StablecoinPegType =
    | "usd"
    | "eur"
    | "gbp"
    | "chf"
    | "aud"
    | "cad"
    | "jpy"
    | "cny"
    | "cnh"
    | "krw"
    | "sgd"
    | "myr"
    | "idr"
    | "php"
    | "try"
    | "uah"
    | "rub"
    | "ars"
    | "mxn"
    | "cop"
    | "clp"
    | "pen"
    | "real"
    | "brl"
    | "kes"
    | "zar"
    | "ngn"
    | "ghs"
    | "xof"
    | "kgs"
    | "gold"
    | "silver"
    | "var"
    | "unknown";

export type PharosGrade =
    "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D" | "F";

export interface TokenStablecoin {
    id: string;
    pegType: StablecoinPegType;
    pegMechanism: StablecoinPegMechanism;
    activeDepegBps?: number | null;
    grade?: PharosGrade | null;
    priceConfidence?: string | null;
    priceUsd?: number | null;
}

export type ExposureClass =
    | "idle"
    | "fiat-stable"
    | "blue-chip"
    | "market-risk"
    | "counterparty"
    | "leverage"
    | "unknown";

export interface Token {
    chain: string;
    address: string;
    symbol: string;
    decimals: number;
    classes?: ExposureClass[] | null;
    stablecoin?: TokenStablecoin | null;
}
