import appStyle from './App.module.scss';
import { Footer } from './Footer';
import { Calendar } from './calendar/Calendar';
import { EventSelection } from './event-selection/EventSelection';
import { stateContext } from './state';
import { useEffect, useState } from 'react';
import { WCJ } from './types';

type Props = WCJ.Context & {
	parent: HTMLElement;
	isLoading: boolean;
};

export function App(props: Props) {
	const [rememberSelection, setRememberSelection] = useState<boolean>(
		props.rememberSelection,
	);
	const [checkedEvents, setCheckedEvents] = useCheckedEvents(
		props.events.map((x) => x.id),
		props.selectedEventIds,
		rememberSelection,
	);

	return (
		<stateContext.Provider
			value={{
				categories: props.categories,
				events: props.events,
				checkedEvents,
				rememberSelection,
			}}
		>
			<div className={appStyle.contentWrapper}>
				<div className={appStyle.eventSelection} data-testid="event-selection">
					<EventSelection
						isLoading={props.isLoading}
						setCheckedEvents={setCheckedEvents}
						setRememberSelection={setRememberSelection}
					/>
				</div>
				<div className={appStyle.calendar} data-testid="calendar">
					<Calendar events={props.events} checkedEvents={checkedEvents} />
				</div>
			</div>
			<Footer />
		</stateContext.Provider>
	);
}

export function useCheckedEvents(
	allEventIds: string[],
	initialSelection: string[],
	rememberSelection: boolean,
) {
	// This is a hook to store the user selection events into localstorage to keep it over multiple sessions.
	// Since new events can be added from one session to another, and we want the user to be able to see the new event,
	// we actually store the unselected events rather than the selected ones.

	const [checkedEvents, setCheckedEvents] =
		useState<string[]>(initialSelection);

	// When checkedEvents is changed, put it in localStorage
	useEffect(() => {
		if (rememberSelection) {
			const uncheckedEvents = allEventIds.filter(
				(eventId) => !checkedEvents.includes(eventId),
			);
			localStorage.setItem('uncheckedEvents', JSON.stringify(uncheckedEvents));
			localStorage.setItem('rememberSelection', 'true');
		} else {
			localStorage.setItem('rememberSelection', 'false');
		}
	}, [allEventIds, checkedEvents, rememberSelection]);

	return [checkedEvents, setCheckedEvents] as const;
}
