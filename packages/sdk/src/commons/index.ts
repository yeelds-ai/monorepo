export enum Environment {
    Development = "development",
    Production = "production",
}

export interface ServiceUrls {
    yeelds: string;
}

export const SERVICE_URLS: Record<Environment, ServiceUrls> = {
    [Environment.Development]: {
        yeelds: "https://api.dev.yeelds.ai",
    },
    [Environment.Production]: {
        yeelds: "https://api.yeelds.ai",
    },
};
