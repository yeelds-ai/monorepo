import { SERVICE_URLS } from "@yeelds/sdk";
import type { NextRequest } from "next/server";

import { ENVIRONMENT } from "@/src/commons/env";
import { YEELDS_API_TOKEN } from "@/src/commons/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ endpoint: string[] }> },
) {
    const headers = new Headers(request.headers);
    headers.set("Authorization", `Bearer ${YEELDS_API_TOKEN}`);
    headers.delete("host");

    const { endpoint } = await params;
    const pathname = endpoint.join("/");

    const proxyURL = new URL(pathname, `${SERVICE_URLS[ENVIRONMENT].yeelds}`);
    proxyURL.search = request.nextUrl.search;

    const proxyRequest = new Request(proxyURL, request);

    try {
        const response = await fetch(proxyRequest, { headers: headers });
        return Response.json(await response.json());
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unexpected exception";
        return new Response(message, { status: 502 });
    }
}
