import $ from 'jquery';
import ColorHash from 'color-hash';
import { MyEvent } from './types';
import FCSetupFactory from './fullcalendar-setup';


let uniqueEvents: MyEvent[] = [];
let selectedEvents: MyEvent[] = [];

const fcHandler = FCSetupFactory();
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

  setupCheckboxList(response.result.items.map(x => ({
    ...x,
    bgColor: colorHash.hex(x.summary),
    textColor: colorHash.hsl(x.summary)[2] > 0.5 ? "black" : "white"
  })));

  const calendarEl = $('#calendar').get(0);
  fcHandler.setup(calendarEl);
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
        fcHandler.setEvents(selectedEvents);
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
    fcHandler.setEvents(selectedEvents);
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
    fcHandler.setEvents(selectedEvents);
  });
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

