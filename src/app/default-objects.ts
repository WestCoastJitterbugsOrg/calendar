import initWcjColorHash from './color';
import initFullerCalendar from './fullercalendar';
import makeWcjEventCreator from './event/wcj';
import initEventList from './event-group-list';


const dependencies = {
    initFullerCalendar: initFullerCalendar,
    initWcjColorHash: initWcjColorHash,
    initEventList: initEventList,
    wcjEventCreator: makeWcjEventCreator({initWcjColorHash})
}

export default dependencies
