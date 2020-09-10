/**
 * Sample JavaScript code for calendar.events.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

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
    "timeMin": "2020-09-10T10:43:14.507Z"
  })
    .then(function (response) {
      const events = response.result.items;
      var uniqueEvents = [];
      $.each(events, function (i, el) {
        if ($.inArray(el, uniqueEvents) === -1) uniqueEvents.push(el);
      });

      $.each(uniqueEvents, function (i, el) {
        $("#courseList").append(`<label><input type="checkbox">${el}</label>`)
      })
      var calendarEl = $('#calendar').get(0);
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        firstDay: 1 // Monday
      });
      calendar.render();
    },
      function (err) { console.error("Execute error", err); });
}


function handleClientLoad() {
  gapi.load("client", () => {

    loadClient().then(execute);


  });
}