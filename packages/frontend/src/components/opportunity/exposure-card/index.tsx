import { Card, Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { ServerStackIcon } from "@/src/assets";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { DetailRow } from "../detail-row";
import { AllocationsTable } from "./allocations-table";
import { AssetList } from "./asset-list";

import styles from "./styles.module.css";

interface ExposureCardProps {
    opportunity: EnrichedOpportunity;
}

export function ExposureCard({ opportunity }: ExposureCardProps) {
    const t = useTranslations("opportunity.exposureCard");

    const isStablecoin = opportunity.assets.some(
        (asset) => asset.token.stablecoin != null,
    );
    const depositTokenSymbol = opportunity.assets[0]?.token.symbol ?? "";

    return (
        <Card icon={ServerStackIcon} title={t("title")} className={styles.root}>
            <DetailRow label={t("category")}>
                <Typography as="span" size={14} weight="bold">
                    {isStablecoin
                        ? t("categoryStablecoin")
                        : t("categoryGeneric")}
                </Typography>
            </DetailRow>
            <DetailRow label={t("depositToken")}>
                <AssetList assets={opportunity.assets} />
            </DetailRow>
            <AllocationsTable
                allocations={opportunity.allocations}
                depositTokenSymbol={depositTokenSymbol}
            />
        </Card>
    );
}
