import { WcjEvent } from "../event/types";

export function getUniqueEvents(events: WcjEvent[]): WcjEvent[] {
    // Courses that have the same summary (name) are the same courses on different time slots. 
    // Let's find the unique ones by filtering by summary
    // (Yes, there are more efficient ways to do this, deal with it! 😎)
    const uniqueEvents: WcjEvent[] = [];
    for (const el of events) {
        if (!uniqueEvents.find(e => e.title === el.title)) {
            el.id = el.title.replace(/[^A-Za-z0-9-_]/g, ''); // Create id valid for HTML
            uniqueEvents.push(el);
        }
    }
    return uniqueEvents;
}