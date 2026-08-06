import { type Opportunity, SupportedProtocolSlug } from "@yeelds/sdk";
import type { FunctionComponent } from "react";

import type { SVGIcon } from "./common";

export { SupportedProtocolSlug };

export interface ProtocolData {
    slug: SupportedProtocolSlug;
    name: string;
    icon: FunctionComponent<SVGIcon>;
    url: string;
    buildDepositUrl: (opportunity: Opportunity) => string;
}
