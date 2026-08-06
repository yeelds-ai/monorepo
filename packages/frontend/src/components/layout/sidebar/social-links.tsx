import { useTranslations } from "next-intl";
import type { FunctionComponent, SVGProps } from "react";

import { TelegramLogo, XLogo } from "@/src/assets";
import type { TranslationsKeys } from "@/src/types/utils";

import styles from "./styles.module.css";

// A blank href renders the icon dimmed and non-clickable — we never ship a
// guessed social link.
const SOCIALS: {
    name: TranslationsKeys<"navigation.socials">;
    href: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}[] = [
    { name: "x", href: "https://x.com/YeeldsAi", icon: XLogo },
    { name: "telegram", href: "https://t.me/YeeldsAi", icon: TelegramLogo },
];

export function SocialLinks() {
    const t = useTranslations("navigation.socials");

    return (
        <div className={styles.socials}>
            {SOCIALS.map(({ name, href, icon: Icon }) => {
                const label = t(name);

                if (!href)
                    return (
                        <span
                            key={name}
                            aria-label={label}
                            className={styles.socialDisabled}
                        >
                            <Icon className={styles.socialIcon} />
                        </span>
                    );

                return (
                    <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={styles.social}
                    >
                        <Icon className={styles.socialIcon} />
                    </a>
                );
            })}
        </div>
    );
}
