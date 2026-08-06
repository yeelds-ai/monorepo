import { Typography } from "@yeelds/ui";

import { ChainDot } from "@/src/components/chain-dot";
import { Link } from "@/src/i18n/routing";
import type { DealSummary } from "@/src/types/deal";

import styles from "./styles.module.css";

interface DealCardProps {
    slug: string;
    summary: DealSummary;
}

export function DealCard({ slug, summary }: DealCardProps) {
    return (
        <div className={styles.card}>
            <Link href={`/deals/${slug}`} className={styles.link} />
            <div className={styles.content}>
                <div className={styles.identity}>
                    <ChainDot chain={summary.chain} size={36} />
                    <div className={styles.identityText}>
                        <Typography size={12} variant="secondary">
                            {summary.provider}
                        </Typography>
                        <Typography size={16} weight="bold">
                            {summary.title}
                        </Typography>
                    </div>
                </div>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <Typography as="span" size={20} font="brand">
                            {summary.metric}
                        </Typography>
                        <Typography as="span" size={12} variant="secondary">
                            {summary.metricLabel}
                        </Typography>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.stat}>
                        <Typography as="span" size={20} font="brand">
                            {summary.secondary}
                        </Typography>
                        <Typography as="span" size={12} variant="secondary">
                            {summary.secondaryLabel}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}
