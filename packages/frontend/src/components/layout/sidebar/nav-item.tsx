import { Typography } from "@yeelds/ui";
import classNames from "classnames";
import type { FunctionComponent, SVGProps } from "react";

import { Link } from "@/src/i18n/routing";

import styles from "./styles.module.css";

interface NavItemProps {
    href: string;
    label: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    active: boolean;
    external?: boolean;
    onClick?: () => void;
}

export function NavItem({
    href,
    label,
    icon: Icon,
    active,
    external = false,
    onClick,
}: NavItemProps) {
    const isActive = !external && active;

    const content = (
        <>
            <Icon aria-hidden="true" className={styles.itemIcon} />
            <Typography
                size={14}
                className={classNames({ [styles.activeLabel]: isActive })}
            >
                {label}
            </Typography>
        </>
    );

    const className = classNames("navItem", styles.item, {
        [styles.active]: isActive,
    });

    if (external)
        return (
            <a
                href={href}
                onClick={onClick}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {content}
            </a>
        );

    return (
        <Link
            href={href}
            onClick={onClick}
            aria-current={isActive ? "page" : undefined}
            className={className}
        >
            {content}
        </Link>
    );
}
