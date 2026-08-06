export interface FeedItem {
    url: string;
    publication: string;
    author: string;
    title: string;
    excerpt: string;
    bodyText: string;
    bodyHtml?: string | null;
    publishedAt: string;
    readTimeMin: number;
}

export interface PaginatedFeedResponse {
    items: FeedItem[];
    totalItems: number;
}
