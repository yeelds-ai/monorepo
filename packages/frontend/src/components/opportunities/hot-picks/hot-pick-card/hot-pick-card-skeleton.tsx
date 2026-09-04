import { Skeleton } from "@yeelds/ui";
import classNames from "classnames";

import identityStyles from "./identity/styles.module.css";
import styles from "./styles.module.css";

export function HotPickCardSkeleton() {
    return (
        <div className={classNames(styles.card, styles.skeleton)}>
            <div className={identityStyles.root}>
                <div className={identityStyles.logoWrapper}>
                    <Skeleton circular width={32} />
                    <Skeleton
                        circular
                        width={16}
                        className={identityStyles.chainDot}
                    />
                </div>
                <div
                    className={classNames(
                        identityStyles.infoContainer,
                        styles.skeletonInfo,
                    )}
                >
                    <div className={identityStyles.labelRow}>
                        <Skeleton size={14} width={12} />
                        <Skeleton size={14} width={90} />
                    </div>
                    <div className={identityStyles.titleRow}>
                        <Skeleton size={18} width={60} />
                        <Skeleton size={14} width={80} />
                    </div>
                </div>
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
