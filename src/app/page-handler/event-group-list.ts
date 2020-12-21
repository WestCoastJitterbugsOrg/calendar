import { WcjEvent } from './../event/types';
import { EventGroupList } from './types';

const EventGroupList: EventGroupList = allEvents => {
    let selectedEvents: WcjEvent[] = [];
    const select = (id: string) => {
        const foundEvents = allEvents.filter(x => x.id === id);
        selectedEvents.push(...foundEvents);
        return foundEvents;
    }
    const deselect = (id: string) => {
        const foundEvents = selectedEvents.filter(x => x.id === id);
        selectedEvents = selectedEvents.filter(x => x.id !== id);
        return foundEvents;
    }
    return {
        getSelected: () => selectedEvents,
        select: select,
        deselect: deselect
    }
}

export { EventGroupList }