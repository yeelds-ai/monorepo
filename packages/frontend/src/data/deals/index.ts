import type { DealDetail } from "@/src/types/deal";
import { deal as fortyAcresDeal } from "./40acres-trenches";
import { deal as toriDeal } from "./tori-trenches";

const DEALS: DealDetail[] = [fortyAcresDeal, toriDeal];

const DEALS_BY_SLUG: Record<string, DealDetail | undefined> =
    Object.fromEntries(DEALS.map((deal) => [deal.slug, deal]));

export function getDealDetail(slug: string): DealDetail | undefined {
    return DEALS_BY_SLUG[slug];
}

export function getAllDealSlugs(): string[] {
    return DEALS.map((deal) => deal.slug);
}

export function getDealSummaries(): Pick<DealDetail, "slug" | "summary">[] {
    return DEALS.map(({ slug, summary }) => ({ slug, summary }));
}
