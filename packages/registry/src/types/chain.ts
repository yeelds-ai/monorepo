import type { FunctionComponent } from "react";

import type { SVGIcon } from "./common";

export interface ChainData {
    id: number;
    name: string;
    slug: string;
    blockExplorerUrl: string;
    icon: FunctionComponent<SVGIcon>;
}
