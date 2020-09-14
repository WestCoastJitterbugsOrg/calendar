var calendar;
var uniqueEvents = [];
var selectedEvents = [];
var currentCalendarTimeFrame = 'month'; // 'month' or 'week'
var currentCalendarViewType = 'grid'; // 'grid' or 'list'

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

  setupCheckboxList(response.result.items)
  setupFullCalendar();
  calendar.render();
}

function setupCheckboxList(gcEvents) {
  // Courses that have the same summary (name) are the same courses on different time slots. 
  // Let's find the unique ones!
  uniqueEvents = [];
  for (let el of gcEvents) {
    if (!uniqueEvents.find(e => e.summary === el.summary)) {
      uniqueEvents.push(el);
    }
  };

  // Create all checkboxes out of the unique events
  for (let el of uniqueEvents) {
    const checkboxEl = $(`<input type="checkbox" class="courseCheckbox" id="course-${el.summary}">`)
                       .on("change",function() {
                         if(this.checked) {
                          // Checkbox has been set to "checked", so we add it to selectedEvents
                          const foundEvents = gcEvents.filter(x => x.summary === el.summary)
                          selectedEvents.push(...foundEvents);
                         }else {
                          // Checkbox has been set to "unchecked", so we remove it from selectedEvents
                           selectedEvents = selectedEvents.filter(x => x.summary !== el.summary);
                         }
                         reloadCalendar(this);
                        }); 
    const liContent = checkboxEl.add(`<label for="course-${el.summary}">${el.summary}</label>`); 
    $("#courseList").append($("<li></li>").append(liContent));
  };

  // Setup events for "select all" button
  $("#selectAllCourses").on("click", () => {
    $(".courseCheckbox").prop("checked", true);
    selectedEvents = [...gcEvents];
    reloadCalendar();
  });
  // Setup events for "deselect all" button
  $("#deselectAllCourses").on("click", () => {
    $(".courseCheckbox").prop("checked", false);
    selectedEvents = [];
    reloadCalendar();
  });
}

function setupFullCalendar() {
  const calendarEl = $('#calendar').get(0);
  let isInited = false;

  // Select one button and deselect the other (Used for month/week and grid/list switches)
  const selectDeselect = (select, deselect) => {
    calendarEl.querySelectorAll('.fc-button').forEach((button) => {
      if (button.innerText === select) {
        button.classList.add('fc-button-active')
      } else if (button.innerText === deselect) {
        button.classList.remove('fc-button-active');
      }
    });
  }

  // Setup calendar
  calendar = new FullCalendar.Calendar(calendarEl, {
    customButtons: {
      myMonth: {
        text: "Month",
        click: () => {
          currentCalendarTimeFrame = 'month';
          selectDeselect('Month', 'Week');
          changeCalendarView();
        }
      },
      myWeek: {
        text: "Week",
        click: () => {
          currentCalendarTimeFrame = 'week';
          selectDeselect('Week', 'Month');
          changeCalendarView();
        }
      },
      myGrid: {
        text: "Grid",
        click: () => {
          currentCalendarViewType = 'grid';
          selectDeselect('Grid', 'List');
          changeCalendarView();
        }
      },
      myList: {
        text: "List",
        click: () => {
          currentCalendarViewType = 'list';
          selectDeselect('List', 'Grid');
          changeCalendarView();
        }
      }
    },
    viewDidMount: () => {
      if (!isInited) {
        selectDeselect('Month', 'Week');
        selectDeselect('Grid', 'List');
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

  for(const event of selectedEvents) {
    calendar.addEvent(gcToFcEvent(event));
  }

  calendar.render();

}

function gcToFcEvent(gcEvent) {
  return {
    id: gcEvent.summary,
    title: gcEvent.summary,
    start: gcEvent.start.dateTime,
    end: gcEvent.end.dateTime
  }
}

const calendarViews = {
  'month': {
    'grid': 'dayGridMonth',
    'list': 'listMonth'
  },
  'week': {
    'grid': 'timeGridWeek',
    'list': 'listWeek'
  }
}

function changeCalendarView() {
  var timeFrame = calendarViews[currentCalendarTimeFrame]
  var newView = timeFrame && timeFrame[currentCalendarViewType];
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

