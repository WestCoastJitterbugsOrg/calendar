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
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
      const summaries = response.result.items.map(x => x.summary);
      var uniqueSummaries = [];
      $.each(summaries, function (i, el) {
        if ($.inArray(el, uniqueSummaries) === -1) uniqueSummaries.push(el);
      });

      $.each(uniqueSummaries, function (i, el) {
        $("#courseList").append(`<div><input type="checkbox" id="course-summary-${i}"> <label for="course-summary-${i}">${el}</label></div>`)
      })
    },
      function (err) { console.error("Execute error", err); });
}


function handleClientLoad() {
  gapi.load("client", () => {
    loadClient().then(execute);
    var calendarEl = $('#calendar').get(0);
    // var calendarEl = document.getElementById("calendar")
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });
}