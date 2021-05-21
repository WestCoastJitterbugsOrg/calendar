import './style/main.scss';
import deps from './app/default-objects';
import $ from "jquery";
import dayjs from 'dayjs';


function handleClientLoad() {
  gapi.load("client", async () => {
    console.log("gapi client loaded");
    gapi.client.setApiKey("AIzaSyCMeXBPWfEvrxH4-U8y3VpWhDPZnwYqRMc");
    // Sometimes Typescript won't find the load function with one argument, so I added empty string in the second
    await gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest", undefined)
      .catch((err) => { alert("Error loading GAPI client for API: " + err); });

    const timeMin = new Date(2019, 7, 1).toISOString();
    const timeMax = new Date(2019, 11, 1).toISOString();
    // Load from Google calendar
    const response = await gapi.client.calendar.events.list({
      calendarId: "wcj.se_57n2cj034c49cirl0rl20t3io4@group.calendar.google.com",
      alwaysIncludeEmail: false,
      timeMin: timeMin, // "2020-09-10T10:43:14.507Z"
      timeMax: timeMax
    });

    const wcjEvents = deps.wcjEventCreator.createFromGoogleCal(response.result.items);
    const calendar = deps.initFullerCalendar($("#calendar").get(0));
    deps.initEventList(wcjEvents, calendar);
    calendar.render();
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

