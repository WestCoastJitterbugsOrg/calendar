import { stateContext } from '../state';
import style from './EventGroup.module.scss';
import { EventGroupHeader } from './EventGroupHeader';
import { EventItem } from './EventItem';
import { useContext, useState } from 'react';

type Props = {
	category: string;
};

export function EventGroup(props: Props) {
	const [expanded, setExpanded] = useState(false);
	const { events } = useContext(stateContext);
	const catEvents = events.filter((event) => event.category === props.category);

	return (
		<div className={style.eventGroup} role="group">
			<EventGroupHeader
				category={props.category}
				expanded={expanded}
				events={catEvents}
				toggleExpanded={() => {
					setExpanded((e) => !e);
				}}
			/>

			<div
				id={`Event group ${props.category}`}
				className={style.panel + (expanded ? ' ' + style.expanded : '')}
			>
				{catEvents.map((event) => {
					return <EventItem event={event} key={event.id} expanded={expanded} />;
				})}
			</div>
		</div>
	);
}
