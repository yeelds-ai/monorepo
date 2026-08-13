import { isFluidSourceData } from "@yeelds/sdk";

import { FluidLogo } from "../assets/logos/protocols/fluid";
import { SUPPORTED_CHAINS } from "../chains";
import { SupportedProtocolSlug } from "../types/protocol";
import type { ProtocolData } from "../types/protocol";

export const fluidData: ProtocolData = {
    slug: SupportedProtocolSlug.Fluid,
    name: "Fluid",
    icon: FluidLogo,
    url: "https://fluid.io",
    buildDepositUrl: (opportunity) => {
        if (!isFluidSourceData(opportunity.protocol.data)) return null;

        const chainData = SUPPORTED_CHAINS[opportunity.chain];
        if (!chainData) return null;

        return `https://fluid.io/${chainData.id}/lending/${opportunity.protocol.data.underlying.symbol.toLowerCase()}`;
    },
};
