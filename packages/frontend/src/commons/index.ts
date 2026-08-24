import { YeeldsApiClient } from "@yeelds/sdk";

// SSR-safe placeholder: this module is also evaluated during the server
// render pass of "use client" components, where `window` doesn't exist yet.
// Never actually fetched against there - these hooks only run their queryFn
// client-side (enabled-gated, no prefetch/hydration in this app).
const BROWSER_ORIGIN =
    typeof window === "undefined" ? "http://localhost" : window.location.origin;

export const YEELDS_API_CLIENT = new YeeldsApiClient(`${BROWSER_ORIGIN}/api/`);

export const SITE_URL = "https://www.yeelds.ai";

export const TOKEN_ICONS_URL =
    "https://raw.githubusercontent.com/metrom-xyz/token-icons/refs/heads/main/mainnet-icons.json";
