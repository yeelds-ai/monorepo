import { SERVICE_URLS, YeeldsApiClient } from "@yeelds/sdk";
import "server-only";

import { ENVIRONMENT, YEELDS_API_TOKEN as TOKEN } from "./env";

if (!TOKEN) throw new Error("A valid YEELDS_API_TOKEN env variable is needed");

export const YEELDS_API_TOKEN = TOKEN;

// Direct backend client for server-only contexts (e.g. generateMetadata),
export const YEELDS_API_CLIENT_SERVER = new YeeldsApiClient(
    SERVICE_URLS[ENVIRONMENT].yeelds,
    { Authorization: `Bearer ${YEELDS_API_TOKEN}` },
);
