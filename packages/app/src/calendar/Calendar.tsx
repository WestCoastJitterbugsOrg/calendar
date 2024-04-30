import { Event } from 'src/types/wcj';
import { Loader } from '../shared/Loader';
import './Calendar.scss';
import { wcj2fcEvent } from './CalendarHelpers';
import { useTooltip } from './tooltip/useTooltip';
import { createListView } from './views/CalendarViewConfigList';
import dayGridMonth from './views/CalendarViewConfigMonth';
import timeGridWeek from './views/CalendarViewConfigWeek';
import { DateInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const FullCalendar = lazy(() => import('@fullcalendar/react'));

type Props = {
	initialDate?: DateInput;
	events: Event[];
	checkedEvents: string[];
	setEventModal?: (eventId: string) => void;
};

export function Calendar(props: Props) {
	const shownWcjEvents = props.events.filter((event) =>
		props.checkedEvents.includes(event.id),
	);

	const shownOccasions = shownWcjEvents.flatMap((event) => event.occasions);

	let firstOccasion = Number.MAX_SAFE_INTEGER;
	let lastOccasion = Number.MIN_SAFE_INTEGER;

	for (const occ of shownOccasions) {
		firstOccasion = Math.min(firstOccasion, occ.start.getTime());
		lastOccasion = Math.max(lastOccasion, occ.end.getTime());
	}

	const fcRootRef = useRef<HTMLDivElement>(null);
	const tooltipHandler = useTooltip(fcRootRef, props.setEventModal);

	const [initialView, setInitialView] = useState('listRange');
	useEffect(() => {
		const fcWidth = fcRootRef.current?.clientWidth;

		if (fcWidth != null) {
			setInitialView(() => (fcWidth <= 640 ? 'listRange' : 'timeGridWeek'));
		}
	}, []);

	return (
		<div className="wcjcal-fc" ref={fcRootRef}>
			<Suspense fallback={<Loader />}>
				<FullCalendar
					plugins={[listPlugin, timeGridPlugin, dayGridPlugin, interaction]}
					initialDate={props.initialDate}
					initialView={initialView}
					height="100%"
					views={{
						dayGridMonth,
						timeGridWeek,
						listRange: createListView(
							new Date(firstOccasion),
							new Date(lastOccasion),
						),
					}}
					buttonText={{
						today: 'Today',
						month: 'Month',
						week: 'Week',
						list: 'List',
					}}
					headerToolbar={{
						start: 'today,prev,next',
						center: 'title',
						end: 'timeGridWeek,dayGridMonth,listRange',
					}}
					firstDay={1}
					nowIndicator
					displayEventEnd
					eventTimeFormat={{
						hour: '2-digit',
						minute: '2-digit',
						meridiem: false,
						hour12: false,
					}}
					eventDisplay="block"
					allDaySlot={false}
					eventSources={shownWcjEvents.map(wcj2fcEvent)}
					eventBackgroundColor="var(--cw-color-primary, #AB2814)"
					eventBorderColor="transparent"
					eventClick={tooltipHandler.handleEventClick}
					selectable={false}
				/>
			</Suspense>
		</div>
	);
}
