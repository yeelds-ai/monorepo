"use client";

import { useTranslations } from "next-intl";

import { OpportunityIdentity } from "@/src/components/opportunity-identity";
import { OpportunitySkeleton } from "@/src/components/page-skeletons/opportunity-skeleton";
import { useOpportunity } from "@/src/hooks/useOpportunity";
import { ErrorState } from "../error-state";
import { NavigationButton } from "../navigation-button";
import { ExposureCard } from "./exposure-card";
import { ReviewCard } from "./review-card";
import { VaultAllocationsCard } from "./vault-allocations-card";

import styles from "./styles.module.css";

interface OpportunityProps {
    chain: string;
    address: string;
}

export function Opportunity({ chain, address }: OpportunityProps) {
    const t = useTranslations("opportunity");
    const { loading, opportunity, notFound } = useOpportunity({
        chain,
        address,
    });

    if (notFound) {
        return (
            <ErrorState
                title={t("notFound.title")}
                description={t("notFound.description")}
            />
        );
    }

    if (loading) return <OpportunitySkeleton />;

    if (!opportunity) return null;

    return (
        <div className={styles.root}>
            <NavigationButton
                href="/opportunities"
                text={t("backToOpportunities")}
            />

            <OpportunityIdentity opportunity={opportunity} size="lg" />

            <div className={styles.content}>
                <div className={styles.leftContent}>
                    {/* TODO: implement risk signal card */}
                    <ExposureCard opportunity={opportunity} />
                    <VaultAllocationsCard opportunity={opportunity} />
                    {/* TODO: implement incentive campaign card */}
                </div>

                <div className={styles.rightContent}>
                    <ReviewCard opportunity={opportunity} />
                </div>
            </div>
        </div>
    );
}
