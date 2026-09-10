import { Skeleton } from "@yeelds/ui";

import styles from "./styles.module.css";

export function NewsItemSkeleton() {
    return (
        <div className={styles.item}>
            <div className={styles.itemHeader}>
                <Skeleton circular width={32} />
                <Skeleton size={14} width={120} />
                <div className={styles.metaSkeleton}>
                    <Skeleton size={12} width={64} />
                    <Skeleton size={12} width={48} />
                </div>
            </div>
            <Skeleton size={16} width="40%" />
            <Skeleton size={14} width="70%" />
        </div>
    );
}
