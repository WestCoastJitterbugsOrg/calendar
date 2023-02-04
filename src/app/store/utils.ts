import { CategoryStore } from './model';
import * as WCJ from '../types/wcj';

export function getCategoryEvents(
	category: CategoryStore,
	allEvents: Record<string, WCJ.Event>
) {
	return category.events.reduce<WCJ.Event[]>(
		(e, id) => [...e, allEvents[id]],
		[]
	);
}
