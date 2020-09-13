var calendar;
var allUniqueEvents;

function loadClient() {
  gapi.client.setApiKey("AIzaSyCMeXBPWfEvrxH4-U8y3VpWhDPZnwYqRMc");
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
    .then(function () { console.log("GAPI client loaded for API"); },
      function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded before calling this method.
function execute() {
  return gapi.client.calendar.events.list({
    "calendarId": "wcj.se_57n2cj034c49cirl0rl20t3io4@group.calendar.google.com",
    "alwaysIncludeEmail": false,
    "timeMin": new Date().toISOString() // "2020-09-10T10:43:14.507Z"
  })
    .then(function (response) {
      console.log(response.result.items);
      const gcEvents = response.result.items;
      allUniqueEvents = [];
      $.each(gcEvents, function (i, el) {
        if (!allUniqueEvents.find(e => e.id === el.summary)) {
          allUniqueEvents.push(gcToFcEvent(el));
        }
      });

      $.each(allUniqueEvents, function (i, el) {
        const id = `course-${el.id}`;
        const checkboxEl = $(`<input type="checkbox" class="courseCheckbox" id="${id}">`).change(reloadCalendar);
        const liContent = checkboxEl.add(`<label for="${id}">${el.title}</label>`);
        $("#courseList").append($("<li></li>").append(liContent));
      });
      var calendarTimeFrame = 'month';
      var calendarViewType = 'grid';

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
        var timeFrame = calendarViews[calendarTimeFrame]
        var newView = timeFrame && timeFrame[calendarViewType];
        if (!newView) {
          alert(`Unexpected view ${calendarTimeFrame} ${calendarViewType}. Contact Jean-Philippe!`);
          return;
        } else {
          calendar.changeView(newView);
        }
      }

      function selectDeselect(select, deselect) {
        console.log(select, deselect);
        calendarEl.querySelectorAll('.fc-button').forEach((button) => {
          if (button.innerText === select) {
            button.classList.add('fc-button-active')
          } else if (button.innerText === deselect) {
            button.classList.remove('fc-button-active');
          }
          calendar.render();
        });
      }

      var calendarEl = $('#calendar').get(0);
      var isInited = false;
      calendar = new FullCalendar.Calendar(calendarEl, {
        customButtons: {
          myMonth: {
            text: "Month",
            click: () => {
              calendarTimeFrame = 'month';
              selectDeselect('Month', 'Week');
              changeCalendarView();
            }
          },
          myWeek: {
            text: "Week",
            click: () => {
              calendarTimeFrame = 'week';
              selectDeselect('Week', 'Month');
              changeCalendarView();
            }
          },
          myGrid: {
            text: "Grid",
            click: () => {
              calendarViewType = 'grid';
              selectDeselect('Grid', 'List');
              changeCalendarView();
            }
          },
          myList: {
            text: "List",
            click: () => {
              calendarViewType = 'list';
              selectDeselect('List', 'Grid');
              changeCalendarView();
            }
          }
        },
        viewDidMount: function (info) {
          if (isInited) {
            return;
          }
          selectDeselect('Month', 'Week');
          selectDeselect('Grid', 'List');
          isInited = true;
        },
        headerToolbar: { center: 'myMonth,myWeek myGrid,myList', end: 'prev,next' },
        nowIndicator: true,
        buttonText: {
          dayGridMonth: 'Month grid',
          timeGridWeek: 'Week grid',
          listMonth: 'Month list',
          listWeek: 'Week list'
        },
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
      calendar.render();
    },
      function (err) { console.error("Execute error", err); });
}

function reloadCalendar() {
  // Each time I reload the calendar, I remove all old events and add the checked ones again
  for (const event of calendar.getEvents()) {
    event.remove();
  }

  $(".courseCheckbox").each((i, el) => {
    const elem = $(el);
    if (!elem.prop("checked")) { return; }
    const id = el.id.replace("course-", "");
    const event = allUniqueEvents.find(e => e.id === id);
    calendar.addEvent(event);
  })
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


function handleClientLoad() {
  gapi.load("client", () => {
    loadClient().then(execute);
  });
}
