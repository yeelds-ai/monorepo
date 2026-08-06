import { EthereumLogo } from "../assets/logos/chains/ethereum";
import type { ChainData } from "../types/chain";

export const ethereumData: ChainData = {
    id: 1,
    name: "Ethereum",
    slug: "ethereum",
    blockExplorerUrl: "https://etherscan.io",
    icon: EthereumLogo,
};
