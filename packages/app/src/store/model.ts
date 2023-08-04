import { Dispatch, SetStateAction } from 'react';
import type WCJ from 'types/wcj';

export type EventStore = {
	categories: Record<string, CategoryStore>;
	events: Record<string, WCJ.Event>;
	// If string, show modal with event matching that id. If undefined, don't show modal
	eventModal?: string;
};

type StateContext = {
	setCategories?: Dispatch<SetStateAction<Record<string, CategoryStore>>>;
	setEvents?: Dispatch<SetStateAction<Record<string, WCJ.Event>>>;
	setEventModal?: Dispatch<SetStateAction<string | undefined>>;
} & EventStore;
export default StateContext;

export type CategoryStore = {
	id: string;
	events: string[];
};
