import { useGroupCheckboxState } from 'src/hooks/group-checkbox-state';
import { stateContext } from '../state';
import style from './EventGroup.module.scss';
import { EventGroupHeader } from './EventGroupHeader';
import { EventItem } from './EventItem';
import { useContext, useState } from 'react';

type Props = {
	category: string;
	setGroupCheckboxState: (state: boolean | 'mixed') => void;
	setEventCheckboxstate: (eventId: string, state: boolean) => void;
};

export function EventGroup(props: Props) {
	const [expanded, setExpanded] = useState(false);
	const { events, checkedEvents } = useContext(stateContext);
	const catEvents = events.filter((e) => e.category === props.category);
	const groupCheckboxState = useGroupCheckboxState(catEvents);

	const categoryEvents = events.filter(
		(event) => event.category === props.category,
	);

	return (
		<div className={style.eventGroup} role="group">
			<EventGroupHeader
				category={props.category}
				expanded={expanded}
				events={categoryEvents}
				toggleExpanded={() => {
					setExpanded((e) => !e);
				}}
				toggleGroupChecked={() => {
					props.setGroupCheckboxState(groupCheckboxState !== true);
				}}
			/>

			<div
				id={`Event group ${props.category}`}
				className={style.panel + (expanded ? ' ' + style.expanded : '')}
			>
				{categoryEvents.map((event) => {
					return (
						<EventItem
							event={event}
							key={event.id}
							expanded={expanded}
							toggleChecked={() => {
								const newState = !checkedEvents.includes(event.id);
								props.setEventCheckboxstate(event.id, newState);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}
