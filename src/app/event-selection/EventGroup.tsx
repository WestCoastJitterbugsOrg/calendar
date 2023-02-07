import { stateContext } from '../store/StateWrapper';
import { getCategoryEvents } from '../store/utils';
import style from './EventGroup.module.scss';
import { EventGroupHeader } from './EventGroupHeader';
import { EventItem } from './EventItem';
import { useContext, useState } from 'react';

type Props = {
	category: string;
};

export function EventGroup(props: Props) {
	const [expanded, setExpanded] = useState(false);
	const { categories, events, setEvents } = useContext(stateContext);

	const category = categories[props.category];
	const catEvents = getCategoryEvents(category, events);

	return (
		<div className={style.eventGroup} role="group">
			<EventGroupHeader
				category={category}
				expanded={expanded}
				events={events}
				setEvents={setEvents}
				toggleExpanded={() => setExpanded((e) => !e)}
			/>

			<div
				id={`Event group ${category.id}`}
				className={style.panel + (expanded ? ' ' + style.expanded : '')}
			>
				{catEvents.map((event) => (
					<EventItem event={event} key={event.id} expanded={expanded} />
				))}
			</div>
		</div>
	);
}
