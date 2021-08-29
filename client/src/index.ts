import "./style/main.scss";
import initFullCalendar from "./app/fullercalendar";
import initEventList, { getAllEventsFromGroups } from "./app/event-group-list";
import { loadDansseData } from "./app/dataLoaders/danse-loader";
import { wcj2fcEvent } from "./app/fullercalendar/helpers";

const wcjUri = "https://wcj.se";
const timeMin = Date.now();

const calendar = initFullCalendar($("#calendar").get(0));
// now procede to initialize views from data
loadDansseData().then((data) => {
  initEventList(data, calendar);
  let smallest = Number.MAX_SAFE_INTEGER;
  for (const course of getAllEventsFromGroups(data)) {
    const start = new Date(course.occasions[0].start).getTime();
    if (smallest > start) {
      smallest = start;
    }
  }
  calendar.render();
  calendar.gotoDate(Math.max(timeMin, smallest));

  messageNewSize();
});


window.addEventListener("message", (event) => {
  if (event.origin === wcjUri && event.data === "remove scroll") {
    document.body.style.overflowY = "hidden";
  }
});

export function messageNewSize(): void {
  window.parent.postMessage(
    document.documentElement.scrollHeight + "px",
    wcjUri
  );
}
