import type { ReactNode } from "react";

import { Sidebar } from "./sidebar";

import styles from "./styles.module.css";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.root}>
            <Sidebar />
            <div className={styles.mainWrapper}>
                <main className={styles.main}>
                    <div className={styles.mainScroll}>{children}</div>
                </main>
            </div>
        </div>
    );
}
