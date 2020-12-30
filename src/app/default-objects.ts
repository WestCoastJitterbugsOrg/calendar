import {getUniqueEvents} from './page-handler/helpers';
import makeInitColorConverter from './color';
import makeInitPageHandler from './page-handler';
import makeInitFullerCalendar from './fullercalendar';
import ColorHash from 'color-hash';
import {Dependencies} from './types';
import {Calendar as FullCalendar} from "@fullcalendar/core";
import makeWcjEventCreator from './event/wcj';
import {eventGroupList as eventGroupList} from './page-handler/event-group-list';
import {FullCalendarCreator, FullerCalendarCreator} from './fullercalendar/types';
import {PageHandlerCreator} from './page-handler/types';
import {WcjColorHashCreator} from './color/types';
import {WCJEventCreator} from './event/types';

const initFullCalendar: FullCalendarCreator = (el, optionOverrides) => new FullCalendar(el, optionOverrides);
const initFullerCalendar: FullerCalendarCreator = makeInitFullerCalendar({initFullCalendar: initFullCalendar});
const initPageHandler: PageHandlerCreator = makeInitPageHandler({$: $, eventGroupList, initFullerCalendar: initFullerCalendar, getUniqueEvents});
const colorHash: ColorHash = new ColorHash();
const initWcjColorHash: WcjColorHashCreator = makeInitColorConverter({colorHash});
const wcjEventCreator: WCJEventCreator = makeWcjEventCreator({initWcjColorHash});


const dependencies: Dependencies = {
    initFullCalendar,
    initFullerCalendar,
    initPageHandler,
    colorHash,
    initWcjColorHash,
    wcjEventCreator,
    $,
    gapi,
    getUniqueEvents,
    eventGroupList
}


export default dependencies
