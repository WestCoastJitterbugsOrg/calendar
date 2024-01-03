import appStyle from './App.module.scss';
import { EventSeriesModal } from './EventSeriesModal';
import { Footer } from './Footer';
import { Header } from './Header';
import { Calendar } from './calendar/Calendar';
import { EventSelection } from './event-selection/EventSelection';
import { stateContext } from './state';
import { useEffect, useState } from 'react';
import { WCJ } from './types';
import { useCheckedEvents } from './hooks/checked-events';

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
				<div className={appStyle.eventSelection}>
					<EventSelection isLoading={props.isLoading} />
				</div>
				<div className={appStyle.calendar}>
					<Calendar />
				</div>
			</div>
			<Footer />
			<EventSeriesModal parent={props.parent} />
		</stateContext.Provider>
	);
}
