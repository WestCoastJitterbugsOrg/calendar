import FullCalendar from "@fullcalendar/react";
import createListEternal from "./CalendarViewConfigList";
import dayGridMonth from "./CalendarViewConfigMonth";
import timeGridWeek from "./CalendarViewConfigWeek";

export function CalendarViewConfig(
  start: Date,
  end: Date
): typeof FullCalendar.prototype.props["views"] {
  return {
    dayGridMonth: dayGridMonth,
    timeGridWeek: timeGridWeek,
    listEternal: createListEternal(start, end),
  };
}
