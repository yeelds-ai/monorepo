import classNames from "classnames";

import { Typography } from "../typography";

import styles from "./styles.module.css";

export type GradeLetter =
    "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D" | "F";

export interface GradeTagProps {
    grade?: GradeLetter | null;
    score?: number;
    size?: "sm" | "base";
    className?: string;
}

type ColorGroup = "a" | "b" | "c" | "d" | "e";

const COLOR_GROUP_BY_GRADE: Record<GradeLetter, ColorGroup> = {
    "A+": "a",
    A: "a",
    "A-": "a",
    "B+": "b",
    B: "b",
    "B-": "b",
    "C+": "c",
    C: "c",
    "C-": "c",
    D: "d",
    F: "e",
};

const TEXT_CLASS_BY_GROUP: Record<ColorGroup, string> = {
    a: styles.textA,
    b: styles.textB,
    c: styles.textC,
    d: styles.textD,
    e: styles.textE,
};

export function GradeTag({
    grade,
    score,
    size = "base",
    className,
}: GradeTagProps) {
    const group = grade ? COLOR_GROUP_BY_GRADE[grade] : undefined;
    const weight = group ? "bold" : "medium";
    const variant = group ? "primary" : "secondary";
    const textClassName = group ? TEXT_CLASS_BY_GROUP[group] : undefined;

    return (
        <div
            className={classNames(
                "root",
                styles.root,
                styles[size],
                group ? styles[group] : styles.na,
                className,
            )}
        >
            <Typography
                as="span"
                size={size === "sm" ? 14 : 18}
                weight={weight}
                variant={variant}
                className={textClassName}
            >
                {grade ?? "n/a"}
            </Typography>
            {score && (
                <Typography
                    as="span"
                    size={size === "sm" ? 12 : 16}
                    weight={weight}
                    variant={variant}
                    className={textClassName}
                >
                    {`(${score})`}
                </Typography>
            )}
        </div>
    );
}
