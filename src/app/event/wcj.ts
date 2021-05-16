import {Factory} from '../types';
import {WcjEvent, WCJEventCreator} from "./types";
import GCEvent = gapi.client.calendar.Event;

const makeWcjEventCreator: Factory<WCJEventCreator, 'initWcjColorHash'>
    = ({initWcjColorHash}) => {
        const hslSettings = {saturation: 0.35}; // {/*hue: [150, 210], saturation: [0.3, 0.7], lightness:[0.55, 0.75]*/}
        const colorConverter = initWcjColorHash(hslSettings);
        const gc2wcjEvent = (gcEvent: GCEvent, id: string): WcjEvent =>
        ({
            id: id,
            title: gcEvent.summary,
            occasions: [],
            showInCalendar: false,
            bgColor: colorConverter.hex(gcEvent.summary),
            textColor: colorConverter.hsl(gcEvent.summary)[2] > 0.5 ? "black" : "white"
        })


        return {
            createFromGoogleCal: gcEvents => {
                const wcjEvents: {[id: string]: WcjEvent} = {};
                
                for (const gcEvent of gcEvents) {
                    const id = gcEvent.summary.replace(/[^A-Za-z0-9-_]/g, ''); // Create id valid for HTML
                    if (!wcjEvents[id]) {
                        wcjEvents[id] = gc2wcjEvent(gcEvent, id);
                    }
                    wcjEvents[id].occasions.push({
                        start: new Date(gcEvent.start.dateTime),
                        end: new Date(gcEvent.end.dateTime),
                    })

                }

                return wcjEvents;

            }
        }
    }



export default makeWcjEventCreator