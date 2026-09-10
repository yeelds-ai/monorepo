import type { MetadataRoute } from "next";

import { SITE_URL } from "@/src/commons";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ["/en/explore", "/en/opportunities"];

    return routes.map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
    }));
}
