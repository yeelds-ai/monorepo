import type { routing } from "@/src/i18n/routing";
import type en from "./messages/en.json";

// Makes translation keys type-safe: `t("does.not.exist")` becomes a compile
// error, and the locale union is derived from the routing config.
declare module "next-intl" {
    interface AppConfig {
        Locale: (typeof routing.locales)[number];
        Messages: typeof en;
    }
}
