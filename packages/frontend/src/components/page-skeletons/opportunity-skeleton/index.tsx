import { Skeleton } from "@yeelds/ui";

import styles from "./styles.module.css";

export function OpportunitySkeleton() {
    return (
        <div className={styles.root}>
            <Skeleton size={16} width={96} />

            <div className={styles.identity}>
                <div className={styles.topRow}>
                    <span className={styles.logoWrapper}>
                        <Skeleton circular width={48} />
                        <Skeleton
                            circular
                            width={24}
                            className={styles.chainDot}
                        />
                    </span>
                    <span className={styles.nameLine}>
                        <Skeleton size={28} width={160} />
                        <Skeleton size={18} width={100} />
                    </span>
                </div>
                <span className={styles.chipRow}>
                    <Skeleton height={32} width={96} />
                    <Skeleton height={32} width={80} />
                    <Skeleton height={32} width={96} />
                </span>
            </div>

            <div className={styles.content}>
                <div className={styles.leftContent}>
                    {Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <Skeleton circular width={18} />
                                <Skeleton height={24} width={120} />
                            </div>
                            <Skeleton size={14} width="80%" />
                            <Skeleton size={14} width="60%" />
                        </div>
                    ))}
                </div>

                <div className={styles.rightContent}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <Skeleton circular width={24} />
                            <Skeleton height={28} width={120} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
