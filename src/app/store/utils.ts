import WCJ from '../types/wcj';
import { CategoryStore } from './model';

export function getCategoryEvents(
	category: CategoryStore,
	allEvents: Record<string, WCJ.Event>
) {
	return category.events.reduce<WCJ.Event[]>(
		(e, id) => [...e, allEvents[id]],
		[]
	);
}
