import { CategoryStore } from './model';
import type WCJ from 'types/index';

export function getCategoryEvents(
	category: CategoryStore,
	allEvents: Record<string, WCJ.Event>
) {
	return category.events.reduce<WCJ.Event[]>(
		(e, id) => [...e, allEvents[id]],
		[]
	);
}
