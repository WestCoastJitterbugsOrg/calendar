import {WcjEvent} from "../event/types";

export type WcjEventListCreator = (allEvents: {[id: string]: WcjEvent}) => {
    getSelected: () => WcjEvent[],
    select: (id: string) => WcjEvent,
    deselect: (id: string) => WcjEvent
}