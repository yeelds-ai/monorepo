import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import {
    DEFAULT_LOCALE,
    LOCALES,
    LOCALE_PREFIX,
    type Locale,
} from "@/src/config";

export const routing = defineRouting({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: LOCALE_PREFIX,
});

export type { Locale };

// Locale-aware navigation. Components MUST use these instead of next/link and
// next/navigation, or the locale prefix is dropped on client transitions.
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
