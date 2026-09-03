import { isPendleSourceData } from "@yeelds/sdk";

import { PendleLogo } from "../assets";
import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";

export const pendleData: ProtocolData = {
    slug: SupportedProtocolSlug.Pendle,
    name: "Pendle",
    icon: PendleLogo,
    url: "https://app.pendle.finance/",
    buildDepositUrl: (opportunity) => {
        if (!isPendleSourceData(opportunity.protocol.data)) return null;

        switch (opportunity.protocol.data.leg) {
            case "principal-token":
                return `https://app.pendle.finance/trade/markets/${opportunity.protocol.data.market}/swap?view=pt&chain=${opportunity.chain}`;
            case "pool":
                return `https://app.pendle.finance/trade/pools/${opportunity.protocol.data.market}/zap/in?chain=${opportunity.chain}`;
            default:
                return null;
        }
    },
};
