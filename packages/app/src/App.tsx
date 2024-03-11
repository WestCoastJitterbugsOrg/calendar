import appStyle from './App.module.scss';
import { EventSeriesModal } from './EventSeriesModal';
import { Footer } from './Footer';
import { Header } from './Header';
import { Calendar } from './calendar/Calendar';
import { EventSelection } from './event-selection/EventSelection';
import { stateContext } from './state';
import { useEffect, useState } from 'react';
import { WCJ } from './types';
import { canStoreSelection } from './services/cookies';

type Props = WCJ.Context & {
	colors: Record<string, string>;
	parent: HTMLElement;
	isLoading: boolean;
};

export function App(props: Props) {
	useEffect(() => {
		for (const color in props.colors) {
			const colorVal = props.colors[color];
			props.parent.style.setProperty(`--cw-color-${color}`, colorVal);
		}
	}, [props.colors, props.parent]);

	const [eventModal, setEventModal] = useState<string>();
	const [checkedEvents, setCheckedEvents] = useCheckedEvents(
		props.events.map((x) => x.id),
		props.selectedEventIds,
	);

	return (
		<stateContext.Provider
			value={{
				categories: props.categories,
				events: props.events,
				checkedEvents,
				setCheckedEvents,
				eventModal,
				setEventModal,
			}}
		>
			<Header />
			<div className={appStyle.contentWrapper}>
				<div className={appStyle.eventSelection} data-testid="event-selection">
					<EventSelection isLoading={props.isLoading} />
				</div>
				<div className={appStyle.calendar} data-testid="calendar">
					<Calendar events={props.events} checkedEvents={checkedEvents} />
				</div>
			</div>
			<Footer />
			<EventSeriesModal
				parent={props.parent}
				event={props.events.find((event) => event.id === eventModal)}
				close={() => {
					setEventModal(undefined);
				}}
			/>
		</stateContext.Provider>
	);
}

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
