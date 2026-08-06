import type { FunctionComponent, SVGProps } from "react";

export interface DealTag {
    label: string;
    chain?: string;
    asset?: string;
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
}

export interface DealHero {
    title: string;
    subtitle: string;
    tags: DealTag[];
}

export interface DealDocument {
    label: string;
    href: string;
}

export interface DealFact {
    label: string;
    value: string;
    chain?: string;
    hint?: string;
}

export interface DealFacts {
    metric: string;
    metricUnit: string;
    metricCaption: string;
    rows: DealFact[];
    documents: DealDocument[];
}

export interface DealOverviewFact {
    label: string;
    value: string;
}

export interface DealOverview {
    title?: string;
    paragraphs: string[];
    facts: DealOverviewFact[];
}

export interface YieldScenario {
    tag: string;
    condition: string;
    body: string;
    tone: "protected" | "upside";
}

export interface DealYieldMechanics {
    title?: string;
    intro: string;
    scenarios: YieldScenario[];
}

export interface PayoutItem {
    label: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    value: string;
    caption: string;
}

export interface DealPayout {
    title?: string;
    items: PayoutItem[];
    notes: string[];
}

export interface FlowStep {
    title: string;
    body: string;
}

export interface DealFlow {
    title?: string;
    steps: FlowStep[];
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    x?: string;
}

export interface DealTeam {
    members: TeamMember[];
}

export type DealCtaType = "google_form" | "telegram" | "ref_code" | "external";

export interface DealCta {
    type: DealCtaType;
    target: string;
    label: string;
}

export interface DealSummary {
    provider: string;
    title: string;
    chain: string;
    asset: string;
    metric: string;
    metricLabel: string;
    secondary: string;
    secondaryLabel: string;
}

export interface DealDetail {
    slug: string;
    summary: DealSummary;
    hero: DealHero;
    facts: DealFacts;
    overview: DealOverview;
    yieldMechanics: DealYieldMechanics;
    payout: DealPayout;
    flow?: DealFlow;
    team?: DealTeam;
    cta: DealCta;
    ctaFootnote?: string;
}
