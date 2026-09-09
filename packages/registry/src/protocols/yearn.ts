import { isYearnSourceData } from "@yeelds/sdk";

import { YearnLogo } from "../assets/logos/protocols/yearn";
import { SUPPORTED_CHAINS } from "../chains";
import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";

export const yearnData: ProtocolData = {
    slug: SupportedProtocolSlug.Yearn,
    name: "Yearn",
    icon: YearnLogo,
    url: "https://yearn.fi",
    buildDepositUrl: (opportunity) => {
        if (!isYearnSourceData(opportunity.protocol.data)) return null;

        const chainData = SUPPORTED_CHAINS[opportunity.chain];
        if (!chainData) return null;

        return `https://yearn.fi/vaults/${chainData.id}/${opportunity.protocol.data.underlying.address}`;
    },
};
