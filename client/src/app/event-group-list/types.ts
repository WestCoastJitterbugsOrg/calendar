import { FullerCalendar } from "../fullercalendar/types";

export type EventDict = {[id: string]: Wcj.WcjEvent};

export type WcjEventListCreator = (allEvents: EventDict, calendar: FullerCalendar) => {
    getSelected: () => Wcj.WcjEvent[],
    select: (id: string) => Wcj.WcjEvent,
    deselect: (id: string) => Wcj.WcjEvent
}