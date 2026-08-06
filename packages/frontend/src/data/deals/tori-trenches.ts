import {
    CalendarCheckIcon,
    DollarReceiveIcon,
    TrendingUpIcon,
} from "@/src/assets";
import { DateTimeIcon } from "@/src/assets/date-time-icon";
import type { DealDetail } from "@/src/types/deal";

export const deal: DealDetail = {
    slug: "tori-trenches",
    summary: {
        provider: "Trenches x Tori Finance",
        title: "USDC / USDT on Ethereum",
        chain: "ethereum",
        asset: "USDC",
        metric: "20%",
        metricLabel: "APY floor",
        secondary: "50M",
        secondaryLabel: "Campaign cap",
    },
    hero: {
        title: "Trenches x Tori Finance: Private Allocation",
        subtitle:
            "20% APY floor protection for Trenches whitelisted addresses. 3x CORES boost (1.5x boost for Trenches LPs).",
        tags: [
            { label: "USDC", asset: "USDC" },
            { label: "USDT", asset: "USDT" },
            { label: "Ethereum", chain: "ethereum" },
            { label: "3 months", icon: CalendarCheckIcon },
        ],
    },
    facts: {
        metric: "20%",
        metricUnit: "APY",
        metricCaption: "Floor protection for Trenches whitelisted addresses",
        rows: [
            {
                label: "Deposit",
                value: "USDC / USDT (Ethereum)",
                chain: "ethereum",
            },
            {
                label: "Lockup",
                value: "3 months (1 month hard lock, soft lock after)",
            },
            {
                label: "TGE",
                value: "Est. Q1 2027",
            },
            {
                label: "Campaign cap",
                value: "$5,000,000 USDC",
            },
        ],
        documents: [
            {
                label: "Docs",
                href: "https://docs.tori.finance",
            },
            {
                label: "Transparency (Internal)",
                href: "https://app.tori.finance/transparency",
            },
            {
                label: "Transparency (Accountable)",
                href: "https://accountable.tori.finance/",
            },
        ],
    },
    overview: {
        title: "What is Tori?",
        paragraphs: [
            "Tori is building an institutional-grade yield protocol with a fully transparent on-chain balance sheet.",
        ],
        facts: [
            { label: "trUSD", value: "composable synthetic dollar" },
            {
                label: "strUSD",
                value: "yield-bearing reserve asset targeting 12-15% APY",
            },
            {
                label: "Backers",
                value: "$3.5M Seed Round Led by Delphi Ventures",
            },
            {
                label: "Traction",
                value: "Integrations planned with Curve, Pendle, StakeDAO, and Convex",
            },
            { label: "Target reserve portfolio APY", value: "12-15%" },
        ],
    },
    yieldMechanics: {
        title: "20% APY Floor Protection",
        intro: "The floor protection covers total return (real yield + points value) and protects against lower-than-expected token valuation or points monetization.",
        scenarios: [
            {
                tag: "Floor protection",
                condition: "If total returns are below 20%",
                body: "Tori will distribute additional governance tokens (liquid at TGE) within 3 days of TGE, priced using the 24-hour VWAP after launch, to make up the difference.",
                tone: "protected",
            },
        ],
    },
    payout: {
        title: "Expected Returns",
        items: [
            {
                label: "Pre-Deposit Phase (~4 weeks)",
                icon: DateTimeIcon,
                value: "21.1% APY",
                caption: "13.1% Points, 8.0% Real Yield",
            },
            {
                label: "Ecosystem Vault Phase (~2 months)",
                icon: DollarReceiveIcon,
                value: "24.4% APY",
                caption: "10.4% Points, 14.0% Real Yield",
            },
            {
                label: "Blended Expected Return",
                icon: TrendingUpIcon,
                value: "~23.5% APY",
                caption: "real yield + points value",
            },
        ],
        notes: [
            "Yield Sources — Global money market carry; Curve LP fees + CRV/CVX emissions; Pendle LP yield + swap fees + PENDLE incentives; strUSD reserve portfolio yield.",
        ],
    },
    cta: {
        type: "telegram",
        target: "https://t.me/LuisMontealegre",
        label: "Contact Luis on Telegram",
    },
    ctaFootnote:
        "DM @LuisMontealegre to whitelist address, connect to Tori team, and/or any further questions",
};
