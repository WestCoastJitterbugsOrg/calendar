import {Factory} from '../types';
import {WCJEventCreator} from "./types";

const makeWcjEventCreator: Factory<WCJEventCreator, 'initWcjColorHash'>
    = ({initWcjColorHash: initColorConverter}) => {
        const hslSettings = {saturation: 0.35}; // {/*hue: [150, 210], saturation: [0.3, 0.7], lightness:[0.55, 0.75]*/}
        const colorConverter = initColorConverter(hslSettings);
        return {
            createFromGC: gcEvent => ({
                ...gcEvent,
                title: gcEvent.summary,
                start: new Date(gcEvent.start.dateTime),
                end: new Date(gcEvent.end.dateTime),
                bgColor: colorConverter.hex(gcEvent.summary),
                textColor: colorConverter.hsl(gcEvent.summary)[2] > 0.5 ? "black" : "white"
            })
        }
    }

export default makeWcjEventCreator