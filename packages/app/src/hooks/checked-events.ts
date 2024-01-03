import { useEffect, useState } from 'react';
import { canStoreSelection } from 'src/services/cookies';

export function useCheckedEvents(
	allEventIds: string[],
	initialSelection: string[],
) {
	// This is a hook to store the user selection events into localstorage to keep it over multiple sessions.
	// Since new events can be added from one session to another, and we want the user to be able to see the new event,
	// we actually store the unselected events rather than the selected ones.

	const [checkedEvents, setCheckedEvents] =
		useState<string[]>(initialSelection);

	// When checkedEvents is changed, put it in localStorage
	useEffect(() => {
		if (canStoreSelection()) {
			const uncheckedEvents = allEventIds.filter(
				(eventId) => !checkedEvents.includes(eventId),
			);
			localStorage.setItem('uncheckedEvents', JSON.stringify(uncheckedEvents));
		}
	}, [allEventIds, checkedEvents]);

	return [checkedEvents, setCheckedEvents] as const;
}
