export type Locale = "en";

export const LOCALES: Locale[] = ["en"];

export const DEFAULT_LOCALE: Locale = "en";

// "always" keeps every URL locale-prefixed, so there is exactly one canonical
// path per page. Unprefixed paths are redirected in next.config.ts.
export const LOCALE_PREFIX = "always";
