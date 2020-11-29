import { Calendar as FullCalendar, CalendarOptions } from "@fullcalendar/core";
import { CalendarTimeFrame, CalendarViewType } from "./helpers";

export interface FullerCalendar extends FullCalendar {
    timeFrame: () => keyof typeof CalendarTimeFrame;
    viewType: () => keyof typeof CalendarViewType;}


// A type that describes a function that creates a FullCalendar. See below for more info
export type FullCalendarCreator = (el: HTMLElement, optionOverrides?: CalendarOptions) => FullCalendar;
export type FullCallendarHandlerCreator = { createCalendar: (el: HTMLElement) => FullerCalendar };


export type FcBtnGroupButtons = typeof CalendarTimeFrame | typeof CalendarViewType;

export type FcBtnGroup<T extends FcBtnGroupButtons> = { click: (title: keyof T) => void, getSelected: () => keyof T}