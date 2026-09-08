import { robinhoodData } from "@yeelds/registry";
import { defineChain } from "viem";
import { arbitrum, base, mainnet } from "viem/chains";

export const robinhood = defineChain({
    id: robinhoodData.id,
    name: robinhoodData.name,
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    // TODO: swap for a dedicated provider RPC - this public endpoint is rate-limited
    // and not recommended for production use.
    rpcUrls: { default: { http: ["https://rpc.mainnet.chain.robinhood.com"] } },
    blockExplorers: {
        default: {
            name: "Blockscout",
            url: robinhoodData.blockExplorerUrl,
        },
    },
});

export const EVM_CHAINS = [mainnet, arbitrum, base, robinhood] as const;
