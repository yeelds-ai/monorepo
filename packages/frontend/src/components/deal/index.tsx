import { getTranslations } from "next-intl/server";

import { NavigationButton } from "@/src/components/navigation-button";
import type { DealDetail } from "@/src/types/deal";
import { DealFactsSidebar } from "./facts-sidebar";
import { DealFlow } from "./flow";
import { DealHero } from "./hero";
import { DealOverview } from "./overview";
import { DealPayout } from "./payout";
import { DealTeam } from "./team";
import { DealYieldMechanics } from "./yield-mechanics";

import styles from "./styles.module.css";

interface DealProps {
    deal: DealDetail;
}

export async function Deal({ deal }: DealProps) {
    const t = await getTranslations("deal");

    return (
        <div className={styles.root}>
            <NavigationButton href="/deals" text={t("backToDeals")} />
            <DealHero hero={deal.hero} />

            <div className={styles.content}>
                <div className={styles.main}>
                    <DealOverview
                        title={t("overviewTitle")}
                        overview={deal.overview}
                    />
                    <DealYieldMechanics
                        title={t("yieldMechanicsTitle")}
                        yieldMechanics={deal.yieldMechanics}
                    />
                    <DealPayout title={t("payoutTitle")} payout={deal.payout} />
                    {deal.flow && (
                        <DealFlow flow={deal.flow} title={t("flowTitle")} />
                    )}
                    {deal.team && (
                        <DealTeam team={deal.team} title={t("teamTitle")} />
                    )}
                </div>

                <DealFactsSidebar
                    deal={deal}
                    documentsLabel={t("documentsLabel")}
                />
            </div>
        </div>
    );
}
