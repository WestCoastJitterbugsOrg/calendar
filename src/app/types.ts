import {WCJEventCreator, WcjEvent} from './event/types';
import {PageHandlerCreator, EventGroupList} from './page-handler/types';
import {FullerCalendarCreator, FullCalendarCreator} from './fullercalendar/types';
import {WcjColorHashCreator} from './color/types';

export interface Dependencies {
    initFullCalendar: FullCalendarCreator;
    initFullerCalendar: FullerCalendarCreator;
    initPageHandler: PageHandlerCreator;
    initWcjColorHash: WcjColorHashCreator;
    wcjEventCreator: WCJEventCreator;
    $: JQueryStatic;
    colorHash: ColorHash;
    gapi: typeof gapi;
    getUniqueEvents: (events: WcjEvent[]) => WcjEvent[];
    eventGroupList: EventGroupList
}

export type Factory<Creator, Deps extends keyof Dependencies> = (deps: Pick<Dependencies, Deps>) => Creator