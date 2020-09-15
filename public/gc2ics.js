const ics = require('ics');
export function gc2ics(calName, gcEvents) {
    return ics.createEvents(gcEvents.map(e => gc2icsEvent(calName, e)));
}

function gc2icsEvent(calName, gcEvent) {
    return {
        start: gc2icsDate(gcEvent.start.dateTime),
        end: gc2icsDate(gcEvent.end.dateTime),
        title: gcEvent.summary,
        description: gcEvent.description,
        location: gcEvent.location,
        url: gcEvent.htmlLink,
        geo: ["stora salen", "lilla salen", "forum"].some(gcEvent.location?.toLowerCase()) && { lat: 57.6833, lon: 11.9713 },
        categories: ['Dancing', 'Swing', 'Good times'],
        status: gcEvent.status.toUpperCase(),
        organizer: { name: gcEvent.organizer.displayName, email: gcEvent.organizer.email },
        productId: 'poosham/personalized-WCJ-Calendar',
        uid: gcEvent.id + "-" + Math.random().toString(20).substr(2, 16), // Must be globally unique
        sequence: gcEvent.sequence,
        created: gcEvent.created,
        lastModified: gcEvent.updated,
        calName: calName
    }
}

function gc2icsDate(gcDate) {
    const jsDate = new Date(gcDate);
    return [jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate(), jsDate.getHours(), jsDate.getMinutes()]
}
