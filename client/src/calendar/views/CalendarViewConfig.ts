import { BaseOptionRefiners } from "@fullcalendar/common";
import FullCalendar, { RawOptionsFromRefiners } from "@fullcalendar/react";
import createListEternal from "./CalendarViewConfigList";
import dayGridMonth from "./CalendarViewConfigMonth";
import timeGridWeek from "./CalendarViewConfigWeek";

export type ViewOptions = RawOptionsFromRefiners<
  Required<BaseOptionRefiners>
> & { type?: string };

type ViewConfig = typeof FullCalendar.prototype.props["views"];

export function CalendarViewConfig(start: Date, end: Date): ViewConfig {
  return {
    dayGridMonth: dayGridMonth,
    timeGridWeek: timeGridWeek,
    listEternal: createListEternal(start, end)
  };
}
