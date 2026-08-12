import { isMorphoSourceData } from "@yeelds/sdk";

import { MorphoLogo } from "../assets/logos/protocols/morpho";
import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";

export const morphoData: ProtocolData = {
    slug: SupportedProtocolSlug.Morpho,
    name: "Morpho",
    icon: MorphoLogo,
    url: "https://app.morpho.org",
    buildDepositUrl: (opportunity) => {
        if (!isMorphoSourceData(opportunity.protocol.data)) return null;

        return `https://app.morpho.org/${opportunity.chain}/vault/${opportunity.address}`;
    },
};
