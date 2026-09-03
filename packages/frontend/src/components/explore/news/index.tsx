"use client";

import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { ArrowRightIcon } from "@/src/assets";
import { useFeed } from "@/src/hooks/useFeed";
import { Link } from "@/src/i18n/routing";
import { NewsItem } from "./news-item";
import { NewsItemSkeleton } from "./news-item/news-item-skeleton";

import styles from "./styles.module.css";

const NEWS_ITEMS = 3;

export function WeeklyNews() {
    const t = useTranslations("explore.news");
    const { loading, feedItems } = useFeed({ page: 1, pageSize: NEWS_ITEMS });

    const items = feedItems.slice(0, NEWS_ITEMS);

    return (
        <div className={styles.root}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <Typography as="h2" font="brand" size={20}>
                        {t("title")}
                    </Typography>
                    <Link href="/feed" className={styles.seeAllLink}>
                        <Typography
                            as="span"
                            size={14}
                            weight="bold"
                            color="brand"
                        >
                            {t("seeAll")}
                        </Typography>
                        <ArrowRightIcon className={styles.seeAllIcon} />
                    </Link>
                </div>
                {loading ? (
                    Array.from({ length: NEWS_ITEMS }).map((_, index) => (
                        <NewsItemSkeleton key={index} />
                    ))
                ) : items.length === 0 ? (
                    <Typography
                        size={14}
                        variant="secondary"
                        className={styles.empty}
                    >
                        {t("empty")}
                    </Typography>
                ) : (
                    items.map((item) => <NewsItem key={item.url} item={item} />)
                )}
            </div>
        </div>
    );
}
