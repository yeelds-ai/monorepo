import "server-only";

import { YEELDS_API_TOKEN as TOKEN } from "./env";

if (!TOKEN) throw new Error("A valid YEELDS_API_TOKEN env variable is needed");

export const YEELDS_API_TOKEN = TOKEN;
