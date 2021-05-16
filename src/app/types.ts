import {WCJEventCreator} from './event/types';
import {WcjEventListCreator} from './event-group-list/types';
import {FullerCalendarCreator, FullCalendarCreator} from './fullercalendar/types';
import {WcjColorHashCreator} from './color/types';

export interface Dependencies {
    initFullCalendar: FullCalendarCreator;
    initFullerCalendar: FullerCalendarCreator;
    initWcjColorHash: WcjColorHashCreator;
    initWcjEventList: WcjEventListCreator
    wcjEventCreator: WCJEventCreator;
    $: JQueryStatic;
    colorHash: ColorHash;
    gapi: typeof gapi;
}

export type Factory<Creator, Deps extends keyof Dependencies> = (deps: Pick<Dependencies, Deps>) => Creator