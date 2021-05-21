import {WcjEvent} from "../event/types";
import { FullerCalendar } from "../fullercalendar/types";

export type EventDict = {[id: string]: WcjEvent};

export type WcjEventListCreator = (allEvents: EventDict, calendar: FullerCalendar) => {
    getSelected: () => WcjEvent[],
    select: (id: string) => WcjEvent,
    deselect: (id: string) => WcjEvent
}