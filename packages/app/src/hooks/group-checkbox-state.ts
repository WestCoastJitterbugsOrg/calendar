import { useContext } from 'react';
import { stateContext } from 'src/state';
import { WCJ } from 'src/types';

export function useGroupCheckboxState(events: WCJ.Event[]): boolean | 'mixed' {
	const { checkedEvents } = useContext(stateContext);
	const noOfCheckedEvents = events.filter((event) =>
		checkedEvents.includes(event.id),
	).length;

	switch (noOfCheckedEvents) {
		case 0:
			return false;
		case events.length:
			return true;
		default:
			return 'mixed';
	}
}
