export function formatRelativeTime(isoDate: string): string {
    const then = new Date(isoDate).getTime();
    const elapsed = Date.now() - then;

    const minutes = Math.floor(elapsed / 60_000);
    const hours = Math.floor(elapsed / 3_600_000);
    const days = Math.floor(elapsed / 86_400_000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return new Date(isoDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}
