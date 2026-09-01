"use client";

import { useTranslations } from "next-intl";
import { type FunctionComponent, type SVGProps, useState } from "react";

import {
    AgreementIcon,
    CloseIcon,
    ExploreIcon,
    MenuIcon,
    NewsIcon,
    SpaceDashboardIcon,
    TelegramLogo,
    XLogo,
    YeeldsLogo,
} from "@/src/assets";
import { usePathname } from "@/src/i18n/routing";
import type { TranslationsKeys } from "@/src/types/utils";
import { NavItem } from "./nav-item";
import { NavSection } from "./nav-section";

import styles from "./styles.module.css";

interface NavItem {
    label: TranslationsKeys<"navigation">;
    href: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface CommunityItem {
    label: TranslationsKeys<"navigation.socials">;
    href: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

const DISCOVER_ITEMS: NavItem[] = [
    { label: "explore", href: "/explore", icon: ExploreIcon },
    {
        label: "opportunities",
        href: "/opportunities",
        icon: SpaceDashboardIcon,
    },
];

const RESEARCH_ITEMS: NavItem[] = [
    { label: "feed", href: "/feed", icon: NewsIcon },
    { label: "liquidityDeals", href: "/deals", icon: AgreementIcon },
];

const COMMUNITY_ITEMS: CommunityItem[] = [
    { label: "x", href: "https://x.com/YeeldsAi", icon: XLogo },
    { label: "telegram", href: "https://t.me/YeeldsAi", icon: TelegramLogo },
];

export function Sidebar() {
    const t = useTranslations("navigation");
    const tSocials = useTranslations("navigation.socials");
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleOnOpen() {
        setMobileOpen(true);
    }

    function handleOnClose() {
        setMobileOpen(false);
    }

    const content = (
        <div className={styles.inner}>
            <div className={styles.brand}>
                <YeeldsLogo className={styles.logo} />
            </div>
            <nav aria-label={t("mainNavigation")} className={styles.nav}>
                <NavSection title={t("discover")}>
                    {DISCOVER_ITEMS.map(({ label, href, icon }) => (
                        <NavItem
                            key={href}
                            href={href}
                            label={t(label)}
                            icon={icon}
                            active={pathname === href}
                            onClick={handleOnClose}
                        />
                    ))}
                </NavSection>
                <NavSection title={t("research")}>
                    {RESEARCH_ITEMS.map(({ label, href, icon }) => (
                        <NavItem
                            key={href}
                            href={href}
                            label={t(label)}
                            icon={icon}
                            active={pathname === href}
                            onClick={handleOnClose}
                        />
                    ))}
                </NavSection>
                <NavSection title={t("community")}>
                    {COMMUNITY_ITEMS.map(({ label, href, icon }) => (
                        <NavItem
                            key={href}
                            href={href}
                            label={tSocials(label)}
                            icon={icon}
                            active={false}
                            external
                            onClick={handleOnClose}
                        />
                    ))}
                </NavSection>
            </nav>
        </div>
    );

    return (
        <>
            <div className={styles.topbar}>
                <button
                    onClick={handleOnOpen}
                    aria-label={t("openMenu")}
                    className={styles.hamburger}
                >
                    <MenuIcon className={styles.hamburgerIcon} />
                </button>

                <YeeldsLogo className={styles.topbarLogo} />
            </div>

            {mobileOpen && (
                <div className={styles.drawer}>
                    <div
                        onClick={handleOnClose}
                        aria-hidden="true"
                        className={styles.scrim}
                    />
                    <aside className={styles.drawerPanel}>
                        <button
                            onClick={handleOnClose}
                            aria-label={t("closeMenu")}
                            className={styles.close}
                        >
                            <CloseIcon className={styles.closeIcon} />
                        </button>
                        {content}
                    </aside>
                </div>
            )}

            <aside className={styles.root}>{content}</aside>
        </>
    );
}
