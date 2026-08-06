import type { Opportunity } from "@yeelds/sdk";
import { Card, Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { ServerStackIcon } from "@/src/assets";
import { DetailRow } from "../detail-row";
import { AssetList } from "../vault-allocations-card/asset-list";

import styles from "./styles.module.css";

interface ExposureCardProps {
    opportunity: Opportunity;
}

export function ExposureCard({ opportunity }: ExposureCardProps) {
    const t = useTranslations("opportunity.exposureCard");
    const isStablecoin = opportunity.assets.some(
        (asset) => asset.token.stablecoin != null,
    );

    return (
        <Card icon={ServerStackIcon} title={t("title")} className={styles.root}>
            <DetailRow label={t("type")}>
                <Typography as="span" size={14} weight="bold">
                    {opportunity.assets.length === 1
                        ? t("typeSingle")
                        : t("typeMulti")}
                </Typography>
            </DetailRow>
            <DetailRow label={t("category")}>
                <Typography as="span" size={14} weight="bold">
                    {isStablecoin
                        ? t("categoryStablecoin")
                        : t("categoryGeneric")}
                </Typography>
            </DetailRow>
            <DetailRow label={t("underlyingTokens")}>
                <AssetList assets={opportunity.assets} />
            </DetailRow>
        </Card>
    );
}
