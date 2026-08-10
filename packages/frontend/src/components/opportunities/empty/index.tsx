import { Tag, Typography } from "@yeelds/ui";
import classNames from "classnames";
import { useTranslations } from "next-intl";

import styles from "./styles.module.css";

export function EmptyOpportunities() {
    const t = useTranslations("opportunities.empty");

    return (
        <div className={classNames("root", styles.root)}>
            <div className={styles.illustration} aria-hidden="true">
                <div
                    className={classNames(
                        styles.pill,
                        styles.pillSide,
                        styles.pillLeft,
                    )}
                >
                    <span className={styles.avatar}>
                        <span
                            className={classNames(
                                styles.avatarCircle,
                                styles.avatarCircleSm,
                            )}
                        />
                        <span
                            className={classNames(
                                styles.avatarDot,
                                styles.avatarDotSm,
                            )}
                        />
                    </span>
                    <span className={styles.textBars}>
                        <span
                            className={classNames(
                                styles.textBar,
                                styles.textBarShort,
                            )}
                        />
                        <span
                            className={classNames(
                                styles.textBar,
                                styles.textBarLong,
                            )}
                        />
                    </span>
                </div>
                <div
                    className={classNames(
                        styles.pill,
                        styles.pillSide,
                        styles.pillRight,
                    )}
                >
                    <span
                        className={classNames(
                            styles.textBar,
                            styles.textBarShort,
                            styles.textBarEnd,
                        )}
                    />
                </div>
                <div className={classNames(styles.pill, styles.pillMain)}>
                    <span className={styles.avatar}>
                        <span className={styles.avatarCircle} />
                        <span className={styles.avatarDot} />
                    </span>
                    <div className={styles.pillText}>
                        <Typography size={16} weight="bold">
                            {t("illustration.protocol")}
                        </Typography>
                        <Typography size={12} weight="bold" variant="secondary">
                            {t("illustration.strategyAsset")}
                        </Typography>
                    </div>
                    <Tag padding="spaced" className={styles.tag}>
                        <Typography
                            as="span"
                            variant="secondary"
                            size={16}
                            weight="bold"
                        >
                            {t("illustration.strategy")}
                        </Typography>
                    </Tag>
                </div>
            </div>
            <div className={styles.copy}>
                <Typography size={18} weight="bold">
                    {t("title")}
                </Typography>
                <Typography size={16} variant="secondary">
                    {t("description")}
                </Typography>
            </div>
        </div>
    );
}
