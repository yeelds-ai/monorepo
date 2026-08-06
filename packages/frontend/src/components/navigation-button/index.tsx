import { Typography } from "@yeelds/ui";
import classNames from "classnames";

import { ArrowLeftIcon } from "@/src/assets";
import { Link } from "@/src/i18n/routing";

import styles from "./styles.module.css";

interface NavigationButtonProps {
    href: string;
    text: string;
    className?: string;
}

export function NavigationButton({
    href,
    text,
    className,
}: NavigationButtonProps) {
    return (
        <Link
            href={href}
            className={classNames("root", styles.root, className)}
        >
            <ArrowLeftIcon className={styles.icon} />
            <Typography size={12} weight="bold">
                {text}
            </Typography>
        </Link>
    );
}
