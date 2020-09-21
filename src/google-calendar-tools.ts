import ics, { DateArray, EventStatus } from 'ics';
// eslint-disable-next-line no-undef
import GCalendar = gapi.client.calendar;

function gc2icsDate(gcDate: string): DateArray {
  const jsDate = new Date(gcDate);
  return [
    jsDate.getFullYear(),
    jsDate.getMonth() + 1, jsDate.getDate(),
    jsDate.getHours(),
    jsDate.getMinutes()];
}

function gc2icsEvent(calName: string, gcEvent: GCalendar.Event): ics.EventAttributes {
  return {
    start: gc2icsDate(gcEvent.start.dateTime),
    end: gc2icsDate(gcEvent.end.dateTime),
    title: gcEvent.summary,
    description: gcEvent.description,
    location: gcEvent.location,
    url: gcEvent.htmlLink,
    geo: ['stora salen', 'lilla salen', 'forum'].includes(gcEvent.location?.toLowerCase()) && { lat: 57.6833, lon: 11.9713 },
    categories: ['Dancing', 'Swing', 'Good times'],
    status: gcEvent.status.toUpperCase() as EventStatus,
    organizer: { name: gcEvent.organizer.displayName, email: gcEvent.organizer.email },
    productId: 'poosham/personalized-WCJ-Calendar',
    uid: `${gcEvent.id}-${Math.random().toString(20).substr(2, 16)}`, // Must be globally unique
    sequence: gcEvent.sequence,
    calName,
  };
}

function gc2ics(calName: string, gcEvents: GCalendar.Event[]): ics.ReturnObject {
  return ics.createEvents(gcEvents.map((e) => gc2icsEvent(calName, e)));
}

export default gc2ics;
export {
  gc2icsEvent,
  gc2icsDate,
  GCalendar,
}
