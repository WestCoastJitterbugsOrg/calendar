import './style/main.scss';
import { loadGCalData } from './app/dataLoaders/gapi-loader';
import initFullerCalendar from './app/fullercalendar';
import initEventList from './app/event-group-list';

const timeMin = new Date(2019, 8, 1);

// asynchronously load data first
const loadData = loadGCalData(timeMin);

//make sure that calendar is initialized
const calendar = initFullerCalendar($("#calendar").get(0));

// now procede to initialize views from data
loadData.then(data => {
  initEventList(data, calendar);
  calendar.gotoDate(timeMin);
  calendar.render();
});
