import { stateContext } from '../store/StateWrapper';
import { getCategoryEvents } from '../store/utils';
import { useContext, useState } from 'react';
import { EventItem } from './EventItem';
import { EventGroupHeader } from './EventGroupHeader';
import { default as eventGroupStyle } from './EventGroup.module.scss';

type Props = {
	category: string;
};

export function EventGroup(props: Props) {
	const [expanded, setExpanded] = useState(false);
	const { categories, events, setEvents } = useContext(stateContext);

	const category = categories[props.category];
	const catEvents = getCategoryEvents(category, events);

	return (
		<div className={eventGroupStyle.eventGroup} role="group">
			<EventGroupHeader
				category={category}
				expanded={expanded}
				events={events}
				setEvents={setEvents}
				toggleExpanded={() => setExpanded((e) => !e)}
			/>

			<div className={eventGroupStyle.panel + (expanded ? ' ' + eventGroupStyle.expanded : '')}>
				{catEvents.map((event) => (
					<EventItem event={event} key={event.id} />
				))}
			</div>
		</div>
	);
}
