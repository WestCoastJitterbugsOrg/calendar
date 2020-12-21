import { WcjEvent } from "../event/types";

export type PageHandlerCreator = (events: WcjEvent[]) => void
export type EventGroupList = (allEvents: WcjEvent[]) => {
    getSelected: () => WcjEvent[],
    select: (id: string) => WcjEvent[],
    deselect: (id: string) => WcjEvent[]
}