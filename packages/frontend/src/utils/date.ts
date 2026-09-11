const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_WEEK = 7;

export function isOlderThanDays(isoDate: string, days: number): boolean {
    const elapsed = Date.now() - new Date(isoDate).getTime();
    return elapsed > days * MS_PER_DAY;
}

export function formatRelativeTime(isoDate: string): string {
    const then = new Date(isoDate).getTime();
    const elapsed = Date.now() - then;

    const minutes = Math.floor(elapsed / MS_PER_MINUTE);
    const hours = Math.floor(elapsed / MS_PER_HOUR);
    const days = Math.floor(elapsed / MS_PER_DAY);

    if (minutes < 1) return "just now";
    if (minutes < MINUTES_PER_HOUR) return `${minutes}m ago`;
    if (hours < HOURS_PER_DAY) return `${hours}h ago`;
    if (days < DAYS_PER_WEEK) return `${days}d ago`;

    return new Date(isoDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}
