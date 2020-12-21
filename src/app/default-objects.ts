import { getUniqueEvents } from '~app/page-handler/helpers';
import { setEvents } from '~app/fullercalendar/helpers';
import ColorFactory from './color';
import PageHandlerFactory from './page-handler';
import FullerCalendarFactory from './fullercalendar';
import ColorHash from 'color-hash';
import { Dependencies } from './types';
import { Calendar as FullCalendar, CalendarOptions } from "@fullcalendar/core";
import WCJEventFactory from './event/wcj';
import { EventGroupList } from './page-handler/event-group-list';

const dependencies: Dependencies = {
    fullerCalendar: (() => FullerCalendarFactory(dependencies))(),
    fullCalendar: (el: HTMLElement, optionOverrides: CalendarOptions) => new FullCalendar(el, optionOverrides),
    pageHandler: (() => PageHandlerFactory(dependencies))(),
    color: (() => ColorFactory(dependencies))(),
    wcjEvent: (() => WCJEventFactory(dependencies))(),
    $: $,
    colorHash: new ColorHash(),
    gapi: gapi,
    setEvents: setEvents,
    getUniqueEvents: getUniqueEvents,
    eventGroupList: EventGroupList
}


export default dependencies
