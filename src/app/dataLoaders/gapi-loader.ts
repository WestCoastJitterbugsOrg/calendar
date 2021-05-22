import dayjs from "dayjs";
import $ from "jquery";
import { WcjEvent } from '../../app/event/types';
import { Dependencies } from '../types';

export function loadGCalData(deps: Dependencies,
    timeMin = dayjs(new Date()).subtract(6, "month").toDate(),
    timeMax = dayjs(new Date()).add(1, "year").toDate(),
    ):
    Promise<{ [id: string]: WcjEvent }> {
    return new Promise((resolve, reject) => {
        function handleClientLoad() {
            gapi.load("client", async () => {
                console.log("gapi client loaded");
                gapi.client.setApiKey("AIzaSyCMeXBPWfEvrxH4-U8y3VpWhDPZnwYqRMc");
                // Sometimes Typescript won't find the load function with one argument, so I added empty string in the second
                await gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest", undefined)
                    .catch((err) => { reject("Error loading GAPI client for API: " + err); });

                // Load from Google calendar
                const response = await gapi.client.calendar.events.list({
                    calendarId: "wcj.se_57n2cj034c49cirl0rl20t3io4@group.calendar.google.com",
                    alwaysIncludeEmail: false,
                    timeMin: timeMin.toISOString(), // "2020-09-10T10:43:14.507Z"
                    timeMax: timeMax.toISOString()
                });

                resolve(deps.wcjEventCreator.createFromGoogleCal(response.result.items));

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
            error: reject,
            async: true
        });

    });
}
