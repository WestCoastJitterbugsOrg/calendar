import $ from "jquery";
import PageHandlerFactoryCreator from './app/page-handler';
import './style/main.scss';
import { WcjEvent } from "./app/types";
import { gc2wcjEvent } from "./app/google-calendar-tools";
const PageHandlerFactory = PageHandlerFactoryCreator($);


function handleClientLoad() {
  gapi.load("client", async () => {
    gapi.client.setApiKey("AIzaSyCMeXBPWfEvrxH4-U8y3VpWhDPZnwYqRMc");
    // Sometimes Typescript won't find the load function with one argument, so I added undefined in the second
    await gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest", undefined)
      .catch((err) => { alert("Error loading GAPI client for API: " + err); });
    // Load from Google calendar
    const response = await gapi.client.calendar.events.list({
      "calendarId": "wcj.se_57n2cj034c49cirl0rl20t3io4@group.calendar.google.com",
      "alwaysIncludeEmail": false,
      "timeMin": new Date().toISOString() // "2020-09-10T10:43:14.507Z"
    });

    const events: WcjEvent[] = response.result.items.map(gc2wcjEvent);
    PageHandlerFactory(events);
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

