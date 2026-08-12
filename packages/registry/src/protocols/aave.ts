import { isAaveSourceData } from "@yeelds/sdk";

import { AaveLogo } from "../assets";
import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";

const MARKET_SLUGS: Record<string, string> = {
    AaveV3Ethereum: "proto_mainnet_v3",
    AaveV3EthereumLido: "proto_lido_v3",
    AaveV3EthereumEtherFi: "proto_etherfi_v3",
    AaveV3EthereumHorizon: "proto_horizon_v3",
    AaveV3Base: "proto_base_v3",
    AaveV3Arbitrum: "proto_arbitrum_v3",
    AaveV3Optimism: "proto_optimism_v3",
    AaveV3Polygon: "proto_polygon_v3",
    AaveV3Avalanche: "proto_avalanche_v3",
    AaveV3Gnosis: "proto_gnosis_v3",
    AaveV3BNB: "proto_bnb_v3",
    AaveV3Scroll: "proto_scroll_v3",
    AaveV3ZkSync: "proto_zksync_v3",
    AaveV3Metis: "proto_metis_v3",
    AaveV3Linea: "proto_linea_v3",
    AaveV3Sonic: "proto_sonic_v3",
    AaveV3Celo: "proto_celo_v3",
    AaveV3Soneium: "proto_soneium_v3",
    AaveV3Plasma: "proto_plasma_v3",
    AaveV3InkWhitelabel: "proto_ink_v3",
};

export const aaveData: ProtocolData = {
    slug: SupportedProtocolSlug.Aave,
    name: "Aave",
    icon: AaveLogo,
    url: "https://app.aave.com",
    buildDepositUrl: (opportunity) => {
        if (!isAaveSourceData(opportunity.protocol.data)) return null;
        const data = opportunity.protocol.data;

        const marketName = MARKET_SLUGS[data.market.name];
        if (!marketName) return null;

        return `https://app.aave.com/reserve-overview/?underlyingAsset=${data.underlying.address}&marketName=${marketName}`;
    },
};
