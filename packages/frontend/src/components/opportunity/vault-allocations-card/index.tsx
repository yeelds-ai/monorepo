import type { Opportunity } from "@yeelds/sdk";
import { isMorphoSourceData } from "@yeelds/sdk";
import { Card, Tag, Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { ExternalLinkIcon } from "@/src/assets";
import { PieChartIcon } from "@/src/assets/pie-chart-icon";
import { DetailRow } from "../detail-row";
import { AssetList } from "./asset-list";

import styles from "./styles.module.css";

interface VaultAllocationsCardProps {
    opportunity: Opportunity;
}

export function VaultAllocationsCard({
    opportunity,
}: VaultAllocationsCardProps) {
    const t = useTranslations("opportunity.vaultAllocationsCard");
    const curator = isMorphoSourceData(opportunity.protocol.data)
        ? opportunity.protocol.data.curator
        : undefined;

    return (
        <Card icon={PieChartIcon} title={t("title")} className={styles.root}>
            <div className={styles.tags}>
                {curator?.name && curator.url && (
                    <Tag className={styles.curatorTag} padding="spaced">
                        <Typography size={12} variant="secondary">
                            {t("curator")}
                        </Typography>
                        <a
                            href={curator.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.curatorLink}
                        >
                            <Typography as="span" size={12} weight="bold">
                                {curator.name}
                            </Typography>
                            <ExternalLinkIcon />
                        </a>
                    </Tag>
                )}
            </div>
            <DetailRow label={t("deposits")} className={styles.detailRow}>
                <AssetList assets={opportunity.assets} />
            </DetailRow>
        </Card>
    );
}
