import { WCJEventCreator, WcjEvent } from './event/types';
import { PageHandlerCreator, EventGroupList } from './page-handler/types';
import { FullerCalendarCreator, FullCalendarCreator } from './fullercalendar/types';
import { ColorHashCreator } from './color/types'; import { Calendar as FullCalendar } from "@fullcalendar/core";

export interface Dependencies {
    fullCalendar: FullCalendarCreator;
    fullerCalendar: FullerCalendarCreator;
    pageHandler: PageHandlerCreator;
    color: ColorHashCreator;
    wcjEvent: WCJEventCreator;
    $: JQueryStatic;
    colorHash: ColorHash;
    gapi: typeof gapi;
    setEvents: (calendar: FullCalendar, selectedEvents: WcjEvent[]) => void;
    getUniqueEvents: (events: WcjEvent[]) => WcjEvent[];
    eventGroupList: EventGroupList
}

export type Factory<Creator> = (deps: Dependencies) => Creator