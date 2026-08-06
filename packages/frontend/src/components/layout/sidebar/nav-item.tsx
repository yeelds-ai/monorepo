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
    onClick?: () => void;
}

export function NavItem({
    href,
    label,
    icon: Icon,
    active,
    onClick,
}: NavItemProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
            className={classNames("navItem", styles.item, {
                [styles.active]: active,
            })}
        >
            <Icon aria-hidden="true" className={styles.itemIcon} />
            <Typography
                size={14}
                className={classNames({ [styles.activeLabel]: active })}
            >
                {label}
            </Typography>
        </Link>
    );
}
