import { isLidoSourceData } from "@yeelds/sdk";

import { LidoLogo } from "../assets/logos/protocols/lido";
import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";

export const lidoData: ProtocolData = {
    slug: SupportedProtocolSlug.Lido,
    name: "Lido",
    icon: LidoLogo,
    url: "https://stake.lido.fi",
    buildDepositUrl: (opportunity) => {
        if (!isLidoSourceData(opportunity.protocol.data)) return null;
        return "https://stake.lido.fi/";
    },
};
