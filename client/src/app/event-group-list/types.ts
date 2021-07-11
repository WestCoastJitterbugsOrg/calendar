import { FullerCalendar } from "../fullercalendar/types";


export type WcjEventListCreator = (allEvents: Wcj.WcjEventCategory[], calendar: FullerCalendar) => {
    getSelected: () => Wcj.WcjEvent[],
    select: (id: string) => Wcj.WcjEvent,
    deselect: (id: string) => Wcj.WcjEvent
}