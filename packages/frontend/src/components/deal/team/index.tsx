import { Typography } from "@yeelds/ui";

import { XLogo } from "@/src/assets";
import type { DealTeam as DealTeamData } from "@/src/types/deal";
import { stringToColor } from "@/src/utils/color";
import { SectionCard } from "../section-card";

import styles from "./styles.module.css";

interface DealTeamProps {
    team: DealTeamData;
    title: string;
}

export function DealTeam({ team, title }: DealTeamProps) {
    return (
        <SectionCard number="05" title={title} className={styles.root}>
            <ol className={styles.members}>
                {team.members.map((member) => (
                    <li key={member.name} className={styles.member}>
                        <div
                            className={styles.avatar}
                            style={{
                                backgroundColor: stringToColor(member.name),
                            }}
                        >
                            <Typography size={14} weight="bold" uppercase>
                                {member.name}
                            </Typography>
                        </div>
                        <div className={styles.memberContent}>
                            <div className={styles.memberHeader}>
                                <Typography as="span" size={12} weight="bold">
                                    {member.name}
                                </Typography>
                                <Typography
                                    as="span"
                                    size={10}
                                    variant="secondary"
                                >
                                    {member.role}
                                </Typography>
                            </div>
                            <Typography size={12} variant="secondary">
                                {member.bio}
                            </Typography>
                        </div>
                        {member.x && (
                            <a
                                href={member.x}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.xLink}
                            >
                                <XLogo className={styles.xIcon} />
                            </a>
                        )}
                    </li>
                ))}
            </ol>
        </SectionCard>
    );
}
