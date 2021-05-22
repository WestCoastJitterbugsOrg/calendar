import './style/main.scss';
import deps from './app/default-objects';
import { loadGCalData } from './app/dataLoaders/gapi-loader';
import $ from 'jquery';


(async () => {
  const timeMin = new Date(2019, 8, 1);
  const data = await loadGCalData(deps, timeMin);
  const calendar = deps.initFullerCalendar($("#calendar").get(0));
  deps.initEventList(data, calendar);
  calendar.gotoDate(timeMin);
  calendar.render();
})()

