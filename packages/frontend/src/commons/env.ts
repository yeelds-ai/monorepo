import { Environment } from "@yeelds/sdk";

// The single place `process.env` is read. Validation runs at module load so a
// misconfiguration fails the boot instead of one request, and the cast is what
// lets every consumer treat the value as a real Environment - the throw below is
// the thing that makes it true.
//
// Adding a variable means touching four things: this file, .env.example,
// turbo.json's build.env array, and the env section of CLAUDE.md.

export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment;
if (
    !ENVIRONMENT ||
    !(Object.values(Environment) as string[]).includes(ENVIRONMENT)
)
    throw new Error("A valid NEXT_PUBLIC_ENVIRONMENT env variable is needed");

export const UMAMI_WEBSITE_ID: string =
    process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!;

// Reown (WalletConnect) project id, needed to build the walletConnect connector.
// Required and throwing: it is a NEXT_PUBLIC_ var so this read is client-safe.
// Get one at https://cloud.reown.com.
export const WALLETCONNECT_PROJECT_ID = process.env
    .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
if (!WALLETCONNECT_PROJECT_ID)
    throw new Error(
        "A valid NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable is needed",
    );

// Bearer token Yeelds backend. Optional/non-throwing here since
// this file is also evaluated in client bundles; the required check and the
// server-only guard live in src/commons/server.ts, the only module that
// actually consumes the value.
export const YEELDS_API_TOKEN: string | undefined =
    process.env.YEELDS_API_TOKEN;
