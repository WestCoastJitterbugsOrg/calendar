import { createContext } from 'react';
import { WCJ } from 'src/types';

export type EventStore = {
	categories: string[];
	events: WCJ.Event[];
	checkedEvents: string[];
	// If string, show modal with event matching that id. If undefined, don't show modal
	eventModal?: string;
};

export const stateContext = createContext<EventStore>({
	categories: [],
	events: [],
	checkedEvents: [],
	eventModal: undefined,
});
