import initWcjColorHash from './color';
import initFullerCalendar from './fullercalendar';
import {Dependencies} from './types';
import makeWcjEventCreator from './event/wcj';
import initEventList from './event-group-list';


const dependencies: Dependencies = {
    initFullerCalendar: initFullerCalendar,
    initWcjColorHash: initWcjColorHash,
    initEventList: initEventList,
    wcjEventCreator: makeWcjEventCreator({initWcjColorHash})
}


export default dependencies
