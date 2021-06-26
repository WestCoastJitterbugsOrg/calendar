import './style/main.scss';
import { loadGCalData } from './app/dataLoaders/gapi-loader';
import initFullerCalendar from './app/fullercalendar';
import initEventList from './app/event-group-list';
import { loadDansseData } from './app/dataLoaders/danse-loader';

const timeMin = Date.now();

// asynchronously load data first
const loadData = loadDansseData();

//make sure that calendar is initialized
const calendar = initFullerCalendar($("#calendar").get(0));

// now procede to initialize views from data
loadData.then(data => {
  initEventList(data, calendar);
  calendar.gotoDate(timeMin);
  calendar.render();
});
