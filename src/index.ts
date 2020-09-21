import $ from 'jquery';
import ColorHash from 'color-hash';
import { GCalendar } from './google-calendar-tools';
import { Calendar, EventInput } from '@fullcalendar/core';
import DayGridPlugin from '@fullcalendar/daygrid';
import ListPlugin from '@fullcalendar/list';
import TimeGridPlugin from '@fullcalendar/timegrid';

type CalendarTimeFrame = 'Month' | 'Week';
type CalendarViewType = 'Grid' | 'List';
type CalendarButtonCategory = 'TimeFrame' | 'ViewType';
type MyEvent = GCalendar.Event & {
  /* colors in hex rgb */
  bgColor: string,
  textColor: string
};

let calendar: Calendar;
let uniqueEvents: MyEvent[] = [];
let selectedEvents: MyEvent[] = [];
let currentCalendarTimeFrame: CalendarTimeFrame = 'Month';
let currentCalendarViewType: CalendarViewType = 'Grid';

const colorHash = new ColorHash({ saturation: 0.3 });

async function loadClient() {
  gapi.client.setApiKey("AIzaSyCMeXBPWfEvrxH4-U8y3VpWhDPZnwYqRMc");
  await gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
    .catch((err) => { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded before calling this method.
async function execute() {
  // Load from Google calendar
  const response = await gapi.client.calendar.events.list({
    "calendarId": "wcj.se_57n2cj034c49cirl0rl20t3io4@group.calendar.google.com",
    "alwaysIncludeEmail": false,
    "timeMin": new Date().toISOString() // "2020-09-10T10:43:14.507Z"
  });
  // calendarName = response.result.summary;
  setupCheckboxList(response.result.items.map(x => ({
    ...x,
    bgColor: colorHash.hex(x.summary),
    textColor: colorHash.hsl(x.summary)[2] > 0.5 ? "black" : "white"
  })))
  setupFullCalendar();
  calendar.render();
}

function setupCheckboxList(gcEvents: MyEvent[]) {
  // Courses that have the same summary (name) are the same courses on different time slots. 
  // Let's find the unique ones by filtering by summary
  // (Yes, there are more efficient ways to do this, deal with it! 😎)
  uniqueEvents = [];
  for (const el of gcEvents) {
    if (!uniqueEvents.find(e => e.summary === el.summary)) {
      el.id = el.summary.replace(/[^A-Za-z0-9-_]/g, ''); // Create id valid for HTML
      uniqueEvents.push(el);
    }
  }

  // Create all checkboxes out of the unique events
  for (const el of uniqueEvents) {
    const checkboxEl = $(`<input type="checkbox" class="courseCheckbox" id="course-${el.id}">`)
      .on("change", function () {
        const label = $(this.parentElement).children("label")[0];
        if ((this as HTMLInputElement).checked) {
          // Checkbox has been set to "checked", so we add it to selectedEvents
          const foundEvents = gcEvents.filter(x => x.summary === el.summary)
          selectedEvents.push(...foundEvents.map(x => x));
          label.style.backgroundColor = el.bgColor;
          label.style.color = el.textColor;
        } else {
          // Checkbox has been set to "unchecked", so we remove it from selectedEvents
          selectedEvents = selectedEvents.filter(x => x.summary !== el.summary);
          label.style.backgroundColor = "inherit";
          label.style.color = "inherit";
        }
        reloadCalendar();
      });
    const liContent = checkboxEl.add(`<label for="course-${el.id}" class="courseCheckboxLabel">${el.summary}</label>`);
    const li = $(`<li></li>`).append(liContent);
    $("#courseList").append(li);
  }

  // Setup events for "select all" button
  $("#selectAllCourses").on("click", () => {
    $(".courseCheckbox").prop("checked", true);
    for (const event of uniqueEvents) {
      const liEl = $(`#course-${event.id}`)[0]?.parentElement;
      const labelEl = liEl && $(liEl).children("label")[0];
      if (!labelEl) { continue; }
      labelEl.style.backgroundColor = event.bgColor;
      labelEl.style.color = event.textColor;
    }
    selectedEvents = [...gcEvents];
    reloadCalendar();
  });
  // Setup events for "deselect all" button
  $("#deselectAllCourses").on("click", () => {
    $(".courseCheckbox").prop("checked", false);
    for (const event of uniqueEvents) {
      const liEl = $(`#course-${event.id}`)[0]?.parentElement;
      const labelEl = liEl && $(liEl).children("label")[0];
      if (!labelEl) { continue; }
      labelEl.style.backgroundColor = "inherit";
      labelEl.style.color = "inherit";
    }

    selectedEvents = [];
    reloadCalendar();
  });
}

function setupFullCalendar() {
  const calendarEl = $('#calendar').get(0);
  let isInited = false;

  // Select one button and deselect the other (Used for month/week and grid/list switches)
  const handleCustomClickEvent = (select: CalendarTimeFrame | CalendarViewType,
    deselect: CalendarTimeFrame | CalendarViewType,
    category: CalendarButtonCategory) => {
    if (category === "TimeFrame") {
      currentCalendarTimeFrame = select as CalendarTimeFrame;
    } else if (category === "ViewType") {
      currentCalendarViewType = select as CalendarViewType;
    }
    calendarEl.querySelectorAll('.fc-button').forEach((button: HTMLButtonElement) => {
      if (button.innerText === select) {
        button.classList.add('fc-button-active')
      } else if (button.innerText === deselect) {
        button.classList.remove('fc-button-active');
      }
    });

    changeCalendarView();
  }

  const createCustomButton = (buttonName: CalendarTimeFrame | CalendarViewType,
    deselect: CalendarTimeFrame | CalendarViewType,
    category: CalendarButtonCategory) => {
    return {
      text: buttonName,
      click: () => handleCustomClickEvent(buttonName, deselect, category)
    }
  }

  // Setup calendar
  calendar = new Calendar(calendarEl, {
    plugins: [DayGridPlugin, ListPlugin, TimeGridPlugin],
    customButtons: {
      myMonth: createCustomButton("Month", "Week", "TimeFrame"),
      myWeek: createCustomButton("Week", "Month", "TimeFrame"),
      myGrid: createCustomButton("Grid", "List", "ViewType"),
      myList: createCustomButton("List", "Grid", "ViewType")
    },
    viewDidMount: () => {
      if (!isInited) {
        handleCustomClickEvent("Month", "Week", "TimeFrame");
        handleCustomClickEvent("Grid", "List", "ViewType");
        isInited = true;
      }
    },
    headerToolbar: { center: 'myMonth,myWeek myGrid,myList', end: 'prev,next' },
    nowIndicator: true,
    aspectRatio: 2,
    initialView: 'dayGridMonth',
    firstDay: 1, // Monday
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: false,

    }
  });
}

function reloadCalendar() {

  // Each time I reload the calendar, I remove all old events and add the checked ones again
  for (const event of calendar.getEvents()) {
    event.remove();
  }


  for (const event of selectedEvents) {
    calendar.addEvent(toFcEvent(event));
  }

  calendar.render();

}

function toFcEvent(gcEvent: MyEvent): EventInput {

  return {
    id: gcEvent.id,
    title: gcEvent.summary,
    start: gcEvent.start.dateTime,
    end: gcEvent.end.dateTime,
    groupId: gcEvent.summary,
    backgroundColor: gcEvent.bgColor, // Gives each course its own background color to better distinguish them
    borderColor: gcEvent.bgColor,
    textColor: gcEvent.textColor
  }
}

const calendarViews = {
  'Month': {
    'Grid': 'dayGridMonth',
    'List': 'listMonth'
  },
  'Week': {
    'Grid': 'timeGridWeek',
    'List': 'listWeek'
  }
}

function changeCalendarView() {
  const timeFrame = calendarViews[currentCalendarTimeFrame]
  const newView = timeFrame && timeFrame[currentCalendarViewType];
  if (!newView) {
    alert(`Unexpected view ${currentCalendarTimeFrame} ${currentCalendarViewType}. Contact Jean-Philippe!`);
    return;
  } else {
    calendar.changeView(newView);
  }
}

function handleClientLoad() {
  gapi.load("client", () => {
    loadClient().then(execute);
  });
}

$.ajax({
  url: 'https://apis.google.com/js/api.js',
  dataType: 'script',
  success: () => {
    $(document).on('readystatechange', function () {
      if (this.readyState === 'complete') handleClientLoad();
    });
  },
  async: true
});

