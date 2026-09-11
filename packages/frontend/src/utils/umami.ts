export type RegisteredEvents =
    | "route-execution-started"
    | "route-execution-updated"
    | "route-execution-completed"
    | "route-execution-failed";

export function trackUmamiEvent(event: RegisteredEvents, data?: object): void {
    if (!window.umami) {
        console.error("Umami not found, tracking disabled");
        return;
    }
    window.umami.track(event, data);
}
