import { Typography } from "@yeelds/ui";

import type { DealPayout as DealPayoutData } from "@/src/types/deal";
import { SectionCard } from "../section-card";
import { SectionTile } from "../section-tile";

import styles from "./styles.module.css";

interface DealPayoutProps {
    payout: DealPayoutData;
    title: string;
}

export function DealPayout({ payout, title }: DealPayoutProps) {
    return (
        <SectionCard number="03" title={payout.title ?? title}>
            <div className={styles.items}>
                {payout.items.map((item) => (
                    <SectionTile key={item.label}>
                        <Typography size={10} variant="secondary">
                            {item.label}
                        </Typography>
                        <div className={styles.itemValue}>
                            <item.icon className={styles.itemIcon} />
                            <Typography size={14} weight="bold">
                                {item.value}
                            </Typography>
                        </div>
                        <Typography size={12} variant="secondary">
                            {item.caption}
                        </Typography>
                    </SectionTile>
                ))}
            </div>
            {payout.notes.length > 0 && (
                <div className={styles.notes}>
                    {payout.notes.map((note) => (
                        <Typography key={note} size={14} variant="secondary">
                            {note}
                        </Typography>
                    ))}
                </div>
            )}
        </SectionCard>
    );
}
