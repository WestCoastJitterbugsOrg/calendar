import makeInitColorConverter from './color';
import makeInitFullerCalendar from './fullercalendar';
import ColorHash from 'color-hash';
import {Dependencies} from './types';
import {Calendar as FullCalendar} from "@fullcalendar/core";
import makeWcjEventCreator from './event/wcj';
import {makeWcjEventListCreator} from './event-group-list';
import {FullCalendarCreator, FullerCalendarCreator} from './fullercalendar/types';
import {WcjEventListCreator} from './event-group-list/types';
import {WcjColorHashCreator} from './color/types';
import {WCJEventCreator} from './event/types';
import $ from 'jquery';

const initFullCalendar: FullCalendarCreator = (el, optionOverrides) => new FullCalendar(el, optionOverrides);
const initFullerCalendar: FullerCalendarCreator = makeInitFullerCalendar({initFullCalendar: initFullCalendar});
const initWcjEventList: WcjEventListCreator = makeWcjEventListCreator({initFullerCalendar, $ });
const colorHash: ColorHash = new ColorHash();
const initWcjColorHash: WcjColorHashCreator = makeInitColorConverter({colorHash});
const wcjEventCreator: WCJEventCreator = makeWcjEventCreator({initWcjColorHash});


const dependencies: Dependencies = {
    initFullCalendar,
    initFullerCalendar,
    initWcjColorHash,
    initWcjEventList,
    colorHash,
    wcjEventCreator,
    $,
    gapi
}


export default dependencies
