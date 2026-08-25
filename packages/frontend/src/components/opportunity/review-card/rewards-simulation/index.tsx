"use client";

import { InfoBanner, Input, Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";
import { type ChangeEvent, type KeyboardEvent, useState } from "react";

import { GiftIcon, PenIcon } from "@/src/assets";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import {
    calculateRewardEstimate,
    formatUsd,
    parseUsd,
} from "@/src/utils/format";
import { RewardProjectionCard } from "./reward-projection-card";

import styles from "./styles.module.css";

interface RewardsSimulationProps {
    opportunity: EnrichedOpportunity;
}

const DEFAULT_PRINCIPAL = 1_000;

export function RewardsSimulation({ opportunity }: RewardsSimulationProps) {
    const t = useTranslations("opportunity.review.rewardsSimulation");
    const [principal, setPrincipal] = useState(DEFAULT_PRINCIPAL);
    const [text, setText] = useState(formatUsd(principal));

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    function handleOnBlur() {
        const parsed = parseUsd(text);
        const next = parsed === null ? principal : Math.max(0, parsed);
        setPrincipal(next);
        setText(formatUsd(next));
    }

    function handleOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") event.currentTarget.blur();
    }

    const daily = formatUsd(
        calculateRewardEstimate(opportunity.totalApy, principal, 1),
    );
    const monthly = formatUsd(
        calculateRewardEstimate(opportunity.totalApy, principal, 30),
    );
    const yearly = formatUsd(
        calculateRewardEstimate(opportunity.totalApy, principal, 365),
    );

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <GiftIcon className={styles.giftIcon} />
                <Typography font="brand" size={16}>
                    {t("title")}
                </Typography>
            </div>
            <div className={styles.controls}>
                <Typography size={14} variant="secondary">
                    {t("simulationAt")}
                </Typography>
                <Input
                    value={text}
                    type="text"
                    inputMode="decimal"
                    aria-label={t("simulationAt")}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    onKeyDown={handleOnKeyDown}
                    icon={PenIcon}
                    iconPlacement="right"
                    className={styles.inputRoot}
                />
            </div>
            <div className={styles.forecast}>
                <RewardProjectionCard
                    label={t("periods.daily")}
                    value={daily}
                />
                <RewardProjectionCard
                    label={t("periods.monthly")}
                    value={monthly}
                />
                <RewardProjectionCard
                    label={t("periods.yearly")}
                    value={yearly}
                    variant="highlight"
                />
            </div>
            <InfoBanner text={t("infoBanner")} />
        </div>
    );
}
