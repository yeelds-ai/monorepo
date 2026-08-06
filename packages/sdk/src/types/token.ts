export type Address = string;

export type U256 = string;

export type StablecoinPegMechanism =
    "fiat-backed" | "crypto-backed" | "algorithmic" | "unknown";

export type StablecoinPegType =
    | "usd"
    | "eur"
    | "gbp"
    | "chf"
    | "aud"
    | "cad"
    | "jpy"
    | "cny"
    | "krw"
    | "sgd"
    | "myr"
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
    | "kes"
    | "zar"
    | "ngn"
    | "ghs"
    | "xof"
    | "var"
    | "unknown";

export interface TokenStablecoin {
    id: string;
    pegType: StablecoinPegType;
    pegMechanism: StablecoinPegMechanism;
    priceConfidence?: string | null;
    priceUsd?: number | null;
}

export interface Token {
    chain: string;
    address: Address;
    symbol: string;
    decimals: number;
    stablecoin?: TokenStablecoin | null;
}
