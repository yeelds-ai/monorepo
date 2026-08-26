import type { Token, TokenStablecoin } from "@yeelds/sdk";

interface TokenWithStablecoin extends Token {
    stablecoin: TokenStablecoin;
}
export function isTokenStablecoin(
    token?: Token | null,
): token is TokenWithStablecoin {
    return Boolean(token?.stablecoin?.grade);
}
