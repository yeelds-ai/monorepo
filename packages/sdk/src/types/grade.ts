export interface OpportunityGrade {
    score: number;
    methodologyVersion: number;
    gradedAt: string;
}

export type GradeLetter =
    "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D";

const GRADE_THRESHOLDS: [number, GradeLetter][] = [
    [93, "A+"],
    [87, "A"],
    [82, "A-"],
    [76, "B+"],
    [70, "B"],
    [64, "B-"],
    [57, "C+"],
    [50, "C"],
    [43, "C-"],
];

export function gradeFromScore(score: number): GradeLetter {
    const grade = GRADE_THRESHOLDS.find(([min]) => score >= min);
    if (!grade) return "D";

    return grade[1];
}
