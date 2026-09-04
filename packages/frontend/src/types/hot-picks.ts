import type { FunctionComponent, SVGProps } from "react";

import type { UseOverviewReturnValue } from "../hooks/useOverview";
import type { EnrichedOpportunity } from "./opportunity";

export type HotPickCategoryKey = keyof Pick<
    UseOverviewReturnValue,
    | "topGraded"
    | "topStableYield"
    | "deepestLiquidity"
    | "topBlueChip"
    | "highestApy"
>;

export interface HotPickCategory {
    key: HotPickCategoryKey;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    label: string;
}

export interface HotPickItem {
    category: HotPickCategory;
    opportunity: EnrichedOpportunity;
}
