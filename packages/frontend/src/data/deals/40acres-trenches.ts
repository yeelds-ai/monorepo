import { CalendarCheckIcon, DollarReceiveIcon, LockIcon } from "@/src/assets";
import { DateTimeIcon } from "@/src/assets/date-time-icon";
import type { DealDetail } from "@/src/types/deal";

export const deal: DealDetail = {
    slug: "40acres-trenches",
    summary: {
        provider: "40Acres × TRENCHES",
        title: "USDC on Base",
        chain: "base",
        asset: "USDC",
        metric: "14%",
        metricLabel: "floor APR",
        secondary: "$5M",
        secondaryLabel: "Max. allocation",
    },
    hero: {
        title: "40Acres × TRENCHES: $5M Private Deal",
        subtitle:
            "Deposit USDC on Base into the 40Acres Aerodrome USDC lending vault to earn a fixed minimum APR of 14% (90-day program). If the vault's natural yield exceeds 14%, LPs retain the full upside. 14% represents the downside-protected floor.",
        tags: [
            { label: "USDC", asset: "USDC" },
            { label: "Base", chain: "base" },
            { label: "90 days", icon: CalendarCheckIcon },
            { label: "No hard lock", icon: LockIcon },
        ],
    },
    facts: {
        metric: "14%",
        metricUnit: "APR",
        metricCaption: "Fixed minimum, 90-day term",
        rows: [
            {
                label: "Asset",
                value: "USDC on Base",
                chain: "base",
            },
            {
                label: "Duration",
                value: "90 days",
                hint: "Fixed 90-day program term.",
            },
            {
                label: "Lockup",
                value: "Withdraw anytime",
                hint: "Soft exit — withdraw anytime; the fixed floor applies only to capital held through month-end.",
            },
            {
                label: "Min. commitment",
                value: "$100,000 USDC",
            },
            {
                label: "Max. allocation",
                value: "$5,000,000 USDC",
            },
        ],
        documents: [
            {
                label: "Security audits — Sherlock (4 reviews)",
                href: "https://docs.40acres.finance/security",
            },
            {
                label: "Example LP contractual agreement",
                href: "https://docs.google.com/document/d/1nXnDpzD1zlTDB5NqTXsvmzwKdXWzMnQx4b9jtKpFwcA/edit",
            },
        ],
    },
    overview: {
        paragraphs: [
            "40Acres is a lending protocol for yield-bearing assets. Holders deposit revenue-generating collateral (like veAERO, ybBC/ybETH, etc.) and borrow USDC that self-repays from the collateral's on-chain cashflows. LPs in the 40Acres USDC vault earn fees from those same repayments.",
            "Depositors allocate USDC on Base into a siloed Aerodrome USDC lending vault. Capital is lent exclusively to veAERO borrowers. The vault earns a blended yield from borrower interest and repayments funded by veAERO cashflows (fees, emissions, bribes).",
        ],
        facts: [
            { label: "Structure", value: "Siloed lending vault" },
            { label: "Underwriter", value: "40Acres Credit Committee" },
            { label: "Execution", value: "Aerodrome USDC Vault" },
        ],
    },
    yieldMechanics: {
        intro: "The vault generates yield from two primary sources: interest paid by veAERO borrowers, and borrower repayments funded by veAERO on-chain cashflows (fees, emissions, and bribes).",
        scenarios: [
            {
                tag: "Floor protected",
                condition: "If natural yield is < 14%",
                body: "40Acres treasury tops up the difference so LPs always receive at least the minimum.",
                tone: "protected",
            },
            {
                tag: "Full upside",
                condition: "If natural yield is ≥ 14%",
                body: "LPs receive the higher natural yield with no performance fee on the excess.",
                tone: "upside",
            },
        ],
    },
    payout: {
        items: [
            {
                label: "APR accrual",
                icon: DateTimeIcon,
                value: "Daily",
                caption: "on-chain, per-day index",
            },
            {
                label: "Distribution",
                icon: DollarReceiveIcon,
                value: "End of each month",
                caption: "USDC, month-end",
            },
            {
                label: "Lock",
                icon: LockIcon,
                value: "Withdraw anytime",
                caption: "Soft exit",
            },
        ],
        notes: [
            "Yield accrues daily from the moment your deposit is confirmed. Payouts are distributed at the end of each month in USDC. The fixed 14% floor applies only if capital remains deposited through month-end.",
            "If you withdraw mid-month, you earn the vault's native yield for that month only — the fixed 14% floor does not apply for partial months.",
        ],
    },
    flow: {
        steps: [
            {
                title: "Deposit",
                body: "LPs deposit USDC into a siloed Aerodrome vault.",
            },
            {
                title: "Lending",
                body: "Capital lent to veAERO borrowers via non-liquidating, cashflow-based loans.",
            },
            {
                title: "Repayment & controls",
                body: "Auto-repaid via veAERO yield. 80% utilization cap.",
            },
        ],
    },
    team: {
        members: [
            {
                name: "Christopher Eley",
                role: "Founder",
                bio: "Founder of 40Acres.",
                x: "https://x.com/celey93",
            },
        ],
    },
    cta: {
        type: "telegram",
        target: "https://t.me/LuisMontealegre",
        label: "Contact Luis on Telegram",
    },
};
