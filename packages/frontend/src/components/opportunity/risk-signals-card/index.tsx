import { Card, GradeTag, Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import {
    CalendarCheckIcon,
    MethodologyIcon,
    ShieldIcon,
    YeeldsCompactLogo,
} from "@/src/assets";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { formatOrdinalDate } from "@/src/utils/format";

import styles from "./styles.module.css";

interface RiskSignalsCardProps {
    opportunity: EnrichedOpportunity;
}

export function RiskSignalsCard({ opportunity }: RiskSignalsCardProps) {
    const t = useTranslations("opportunity.riskSignalsCard");
    const { grade } = opportunity;

    if (!grade) return null;

    return (
        <Card icon={ShieldIcon} title={t("title")} className={styles.root}>
            <div className={styles.grade}>
                <div className={styles.gradeHeader}>
                    <YeeldsCompactLogo className={styles.yeeldsLogo} />
                    <Typography as="span" size={12} weight="bold">
                        {t("yeeldsGrade")}
                    </Typography>
                </div>
                <div className={styles.gradeContent}>
                    <GradeTag
                        grade={grade.letter}
                        size="base"
                        className={styles.gradeTag}
                    />
                    <div className={styles.gradeScore}>
                        <span className={styles.scoreRow}>
                            <Typography
                                as="span"
                                font="brand"
                                size={20}
                                className={styles.scoreValue}
                            >
                                {t("score", { score: grade.score })}
                            </Typography>
                            <Typography
                                as="span"
                                font="brand"
                                size={16}
                                variant="secondary"
                                className={styles.scoreValue}
                            >
                                {t("scoreMax")}
                            </Typography>
                        </span>
                        <Typography as="span" size={12} variant="secondary">
                            {t("caption")}
                        </Typography>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <span className={styles.footerItem}>
                    <CalendarCheckIcon className={styles.footerIcon} />
                    <Typography as="span" size={12} variant="secondary">
                        {t("graded", {
                            date: formatOrdinalDate(grade.gradedAt),
                        })}
                    </Typography>
                </span>
                <span className={styles.divider} />
                <span className={styles.footerItem}>
                    <MethodologyIcon className={styles.footerIcon} />
                    <Typography as="span" size={12} variant="secondary">
                        {t("methodology", {
                            version: grade.methodologyVersion,
                        })}
                    </Typography>
                </span>
                <span className={styles.divider} />
                <Typography as="span" size={12} variant="secondary">
                    {t("disclaimer")}
                </Typography>
            </div>
        </Card>
    );
}
