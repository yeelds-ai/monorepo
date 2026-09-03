import type { ExposureClass } from "./token";

export type ProtocolTier = "p1" | "p2" | "p3";

export type StrategyTier = "s1" | "s2" | "s3" | "s4" | "s5";

export interface GradeWithdrawable {
    usd: number;
    share: number;
}

export interface GradeExposure {
    share: number;
    class: ExposureClass;
    address?: string | null;
    symbol?: string | null;
}

export interface GradeNudge {
    factor: string;
    delta: number;
    reason: string;
}

export interface GradeSlash {
    factor: string;
    mult: number;
    reason: string;
}

export interface GradeDerivation {
    exposures: GradeExposure[];
    nudges: GradeNudge[];
    slashes: GradeSlash[];
}

export interface OpportunityGrade {
    score: number;
    strategyTier: StrategyTier;
    protocolTier: ProtocolTier;
    anchorBase: number;
    depositClass: ExposureClass;
    withdrawable: GradeWithdrawable;
    methodologyVersion: number;
    gradedAt: string;
    derivation?: GradeDerivation | null;
}

export type GradeLetter =
    "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D";

export const GRADE_THRESHOLDS: [number, GradeLetter][] = [
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

export type GradeTier = "A" | "B" | "C" | "D";

export const GRADE_TIERS: GradeTier[] = ["A", "B", "C", "D"];

/**
 * Lowest score that still grades within `tier` (its minus-variant floor); 0 for
 * D, which covers everything. Lets a "minimum grade" filter translate a tier
 * into the `minScore` opportunities query param.
 */
export function minScoreForTier(tier: GradeTier): number {
    const floors = GRADE_THRESHOLDS.filter(
        ([, letter]) => letter[0] === tier,
    ).map(([min]) => min);
    return floors.length ? Math.min(...floors) : 0;
}
