import colorConverter from './color';

const gc2wcjEvent = (gcEvent: any, id: string) =>
({
    id: id,
    title: gcEvent.summary,
    occasions: [],
    showInCalendar: false,
    bgColor: colorConverter.hex(gcEvent.summary),
    textColor: colorConverter.hsl(gcEvent.summary)[2] > 0.5 ? "gray" : "white"
})



export default function (gcEvents: any) {
    const wcjEvents: { [id: string]: any } = {};

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