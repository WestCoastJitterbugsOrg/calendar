import './style/main.scss';
import initFullerCalendar from './app/fullercalendar';
import initEventList, { getAllEventsFromGroups } from './app/event-group-list';
import { loadDansseData } from './app/dataLoaders/danse-loader';

const webbVikenUri = 'https://wcj.webbviken.se';
const timeMin = Date.now();

// now procede to initialize views from data
loadDansseData().then(data => {
  initEventList(data, calendar);
  let smallest = Number.MAX_SAFE_INTEGER;
  for(const course of getAllEventsFromGroups(data)) {
    const start = new Date(course.occasions[0].start).getTime()
    if(smallest > start) {
      smallest = start;
    }
  }
  calendar.gotoDate(Math.max(timeMin, smallest));

  messageNewSize();
});

const calendar = initFullerCalendar($("#calendar").get(0));
calendar.render();

window.addEventListener('message', event => {
  if(event.origin === webbVikenUri && event.data === 'remove scroll') {
    document.body.style.overflowY = 'hidden';
  }
})

function messageNewSize() {
    window.parent.postMessage(document.documentElement.scrollHeight + 'px', webbVikenUri);  
}