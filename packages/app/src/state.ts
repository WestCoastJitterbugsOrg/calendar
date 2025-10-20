import { createContext } from 'react';
import { WCJ } from 'src/types';

export type EventStore = {
	categories: string[];
	events: WCJ.Event[];
	checkedEvents: string[];
	rememberSelection: boolean;
};

export const stateContext = createContext<EventStore>({
	categories: [],
	events: [],
	checkedEvents: [],
	rememberSelection: true,
});
