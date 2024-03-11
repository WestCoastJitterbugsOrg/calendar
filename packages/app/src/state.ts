import { Dispatch, SetStateAction, createContext } from 'react';
import { WCJ } from 'src/types';

export type EventStore = {
	categories: string[];
	events: WCJ.Event[];
	checkedEvents: string[];
	// If string, show modal with event matching that id. If undefined, don't show modal
	eventModal?: string;
};

export type StateContext = {
	setCheckedEvents?: Dispatch<SetStateAction<string[]>>;
	setEventModal?: Dispatch<SetStateAction<string | undefined>>;
} & EventStore;

export const stateContext = createContext<StateContext>({
	categories: [],
	events: [],
	checkedEvents: [],
	eventModal: undefined,
});
