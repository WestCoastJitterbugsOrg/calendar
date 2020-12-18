import ColorFactory from "~app/color-hash";
import { WCJEventCreator } from "./types";

export function WCJEventFactory(colorHashCreator = ColorFactory()): WCJEventCreator {
    return {
        createFromGC: gcEvent => {
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