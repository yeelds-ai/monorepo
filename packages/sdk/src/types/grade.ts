// Yeelds vault risk grade letters, best → worst. There is no D+/D-/F: the bands
// end at D. YEELDS_GRADE_ORDER below is the runtime ladder; the `satisfies`
// keeps the two in sync.
export type YeeldsGradeLetter =
    "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D";

// Index = rank (0 = A+, best).
export const YEELDS_GRADE_ORDER = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D",
] as const satisfies readonly YeeldsGradeLetter[];

// The anchor cell the grade starts from: strategy class × protocol tier → base
// points. strategy_tier S1 flat … S5 amplifies; protocol_tier P1 institutional
// … P3 emerging.
export interface YeeldsGradeAnchor {
    strategy_tier: string;
    protocol_tier: string;
    anchor_grade: string;
    anchor_base: number;
}

// Class-1 soft modifier — a bounded additive delta.
export interface YeeldsSoftModifier {
    factor: string;
    delta: number;
    reason: string;
}

// Class-2 critical multiplier — a fatal-leg ×factor. These are what make the
// grade non-averageable.
export interface YeeldsCriticalMultiplier {
    factor: string;
    mult: number;
    reason: string;
}

// At-grading-time context, for provenance and drift detection. NEVER rendered as
// the live number — the UI always shows live TVL/APY.
export interface YeeldsGradeSnapshot {
    tvl_usd: number | null;
    apy_pct: number | null;
    withdrawable_pct: number | null;
    top5_concentration_pct: number | null;
    listed: boolean;
    v1_or_v2: string;
    utilization_pct?: number | null;
}

// A researched vault risk grade.
//
//   score = clamp(round((anchor_base + soft_delta_total) × critical_mult_product), 0, 100)
//
// The full decomposition ships so the breakdown UI can show the arithmetic. Note
// the hard multiplicative caps: the score is never an average of its parts.
export interface YeeldsGrade {
    vault_chain: string;
    vault_address: string;
    protocol_slug: string;
    vault_name: string;
    deposit_asset: string;
    grade: YeeldsGradeLetter;
    // 0-100 — the public within-band differentiator and sort key.
    score: number;
    anchor: YeeldsGradeAnchor;
    soft_modifiers: YeeldsSoftModifier[];
    critical_multipliers: YeeldsCriticalMultiplier[];
    soft_delta_total: number;
    critical_mult_product: number;
    // Disclosed gaps — never silently penalized.
    missing_signals: string[];
    collateral_summary: string;
    curator: string;
    top_risks: string[];
    one_liner: string;
    snapshot: YeeldsGradeSnapshot;
    // ISO date. Surfacing staleness is non-negotiable: a grade is a dated
    // opinion, not a guarantee.
    graded_at: string;
    graded_by: string;
    // Load-bearing — a v1.0 score is not a v1.1 score.
    methodology_version: string;
}
