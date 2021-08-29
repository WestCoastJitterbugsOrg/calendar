import { Calendar as FullCalendar } from "@fullcalendar/core";

export type WcjEventListCreator = (allEvents: Wcj.WcjEventCategory[], calendar: FullCalendar) => void;