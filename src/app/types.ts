import {WCJEventCreator} from './event/types';
import {WcjEventListCreator} from './event-group-list/types';
import {FullerCalendarCreator} from './fullercalendar/types';
import {WcjColorHashCreator} from './color/types';

export interface Dependencies {
    initFullerCalendar: FullerCalendarCreator;
    initWcjColorHash: WcjColorHashCreator;
    initEventList: WcjEventListCreator
    wcjEventCreator: WCJEventCreator;
}

export type Factory<Creator, Deps extends keyof Dependencies> = (deps: Pick<Dependencies, Deps>) => Creator
