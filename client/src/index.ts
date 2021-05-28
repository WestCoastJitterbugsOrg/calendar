import './style/main.scss';
import deps from './app/default-objects';
import { loadGCalData } from './app/dataLoaders/gapi-loader';


const timeMin = new Date(2019, 8, 1);
const calendar = deps.initFullerCalendar($("#calendar").get(0));
loadGCalData(deps, timeMin).then(data => {
  deps.initEventList(data, calendar);
  calendar.gotoDate(timeMin);
  calendar.render();
});
