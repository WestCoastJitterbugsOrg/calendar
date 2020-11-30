import ColorHash from "color-hash";
import ColorFactory from "~app/color-hash";
import { customHash } from "~app/color-hash/helpers";
import { WCJEventCreator } from "./types";

export function WCJEventFactory(colorFactory = ColorFactory, colorHash = new ColorHash({ hash: customHash })): WCJEventCreator {
    return {
        createFromGC: gcEvent => {
            const colorHashCreator = colorFactory(colorHash);
            const hslSettings = { saturation: 0.35 }; // {/*hue: [150, 210], saturation: [0.3, 0.7], lightness:[0.55, 0.75]*/}
            const hash = colorHashCreator.createColorHash(hslSettings);
            return {
                ...gcEvent,
                title: gcEvent.summary,
                start: new Date(gcEvent.start.dateTime),
                end: new Date(gcEvent.end.dateTime),
                bgColor: hash.hex(gcEvent.summary),
                textColor: hash.hsl(gcEvent.summary)[2] > 0.5 ? "black" : "white"
            };
        }
    }
}