import {Calendar as FullCalendar, CalendarOptions} from "@fullcalendar/core";
import {CalendarTimeFrame, CalendarViewType} from "./helpers";


// A type that describes a function that creates a FullCalendar. See below for more info
export type FullCalendarCreator = (el: HTMLElement, optionOverrides?: CalendarOptions) => FullCalendar

export type FcBtnGroupButtons = typeof CalendarTimeFrame | typeof CalendarViewType;

export type FcBtnGroup<T extends FcBtnGroupButtons> = {click: (title: keyof T) => void, getSelected: () => keyof T}