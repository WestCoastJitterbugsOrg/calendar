import ColorHash from "color-hash";

const colorHash = new ColorHash({
    saturation: [0.35, 0.5, 0.65],
    lightness: [0.35, 0.5, 0.65]
});

const gc2wcjEvent = (gcEvent: any, id: string) =>
({
    id: id,
    title: gcEvent.summary,
    occasions: [],
    showInCalendar: false,
    bgColor: colorHash.hex(gcEvent.summary),
    textColor: colorHash.hsl(gcEvent.summary)[2] > 0.5 ? "gray" : "white"
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