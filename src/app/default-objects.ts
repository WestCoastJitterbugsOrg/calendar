import { Calendar as FullCalendar, CalendarOptions } from "@fullcalendar/core";
import { FullCalendarCreator } from "./fullercalendar/fullercalendar";

// Default for dependency injection into FullCalendarFactory below
export const defaultFCCreator: FullCalendarCreator =
    (el: HTMLElement, optionOverrides: CalendarOptions) =>
        new FullCalendar(el, optionOverrides);