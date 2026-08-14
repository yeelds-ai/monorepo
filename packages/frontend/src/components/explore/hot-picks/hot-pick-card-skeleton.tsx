import { Skeleton } from "@yeelds/ui";
import classNames from "classnames";

import styles from "./styles.module.css";

export function HotPickCardSkeleton() {
    return (
        <div className={classNames(styles.card, styles.skeleton)}>
            <div className={styles.skeletonIdentityRow}>
                <div className={styles.skeletonLogoWrapper}>
                    <Skeleton circular width={32} />
                    <Skeleton
                        circular
                        width={16}
                        className={styles.skeletonChainDot}
                    />
                </div>
                <div className={styles.skeletonIdentityText}>
                    <Skeleton size={16} width={90} />
                    <Skeleton size={12} width={70} />
                </div>
                <Skeleton
                    height={28}
                    width={28}
                    className={styles.skeletonGradeTag}
                />
            </div>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <Skeleton size={20} width={60} />
                    <Skeleton size={14} width={30} />
                </div>
                <div className={styles.divider} />
                <div className={styles.stat}>
                    <Skeleton size={14} width={50} />
                    <Skeleton size={14} width={30} />
                </div>
            </div>
        </div>
    );
}
