import { isSparkSourceData } from "@yeelds/sdk";

import { SparkLogo } from "../assets/logos/protocols/spark";
import { SUPPORTED_CHAINS } from "../chains";
import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";

export const sparkData: ProtocolData = {
    slug: SupportedProtocolSlug.Spark,
    name: "Spark",
    icon: SparkLogo,
    url: "https://app.spark.finance",
    buildDepositUrl: (opportunity) => {
        if (!isSparkSourceData(opportunity.protocol.data)) return null;

        const chainData = SUPPORTED_CHAINS[opportunity.chain];
        if (!chainData) return null;

        return `https://app.spark.finance/markets/${chainData.id}/${opportunity.protocol.data.underlying.address}`;
    },
};
