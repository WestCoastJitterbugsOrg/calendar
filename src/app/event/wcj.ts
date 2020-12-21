import { Factory } from '../types';
import { WCJEventCreator } from "./types";

const WCJEventFactory: Factory<WCJEventCreator> = deps => {
    const hslSettings = { saturation: 0.35 }; // {/*hue: [150, 210], saturation: [0.3, 0.7], lightness:[0.55, 0.75]*/}
    const color = deps.color(hslSettings);
    return {
        createFromGC: gcEvent => ({
            ...gcEvent,
            title: gcEvent.summary,
            start: new Date(gcEvent.start.dateTime),
            end: new Date(gcEvent.end.dateTime),
            bgColor: color.hex(gcEvent.summary),
            textColor: color.hsl(gcEvent.summary)[2] > 0.5 ? "black" : "white"
        })
    }
}

export default WCJEventFactory