import { VCALENDAR, VEVENT } from "ics-js";

export default function (events: Wcj.Event[]) {
  const calendar = new VCALENDAR();
  calendar.addProp("PRODID", "WCJ personal calendar");
  calendar.addProp("VERSION", 1);

  for (const event of events) {
    for (const occ of event.occasions) {
      const vevent = new VEVENT();
      vevent.addProp("UID");
      vevent.addProp("DTSTART", new Date(occ.start));
      vevent.addProp("DTEND", new Date(occ.end));
      vevent.addProp("DTSTAMP", new Date());
      vevent.addProp("SUMMARY", event.title);
      vevent.addProp("DESCRIPTION", event.description);
      vevent.addProp("URL", event.registrationUrl);
      vevent.addProp("LOCATION", event.place);
      vevent.addProp("CATEGORIES", [event.category]);
      calendar.addComponent(vevent);
    }
  }
  return calendar.toString();
}
