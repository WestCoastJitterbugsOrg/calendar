import { stateContext } from '../store/StateWrapper';
import { getCategoryEvents } from '../store/utils';
import { useContext, useState } from 'react';
import { EventItem } from './EventItem';
import { EventGroupHeader } from './EventGroupHeader';

type Props = {
	category: string;
}

export function EventGroup(props: Props) {
	const [expanded, setExpanded] = useState(false);
	const { categories, events } = useContext(stateContext);

	const category = categories[props.category];
	const catEvents = getCategoryEvents(category, events);

	return (
		<div className="bg-light" role="group">
			<EventGroupHeader
				category={category}
				expanded={expanded}
				toggleExpanded={() => setExpanded((e) => !e)}
			/>

			<div
				className={`overflow-hidden bg-light ${
					expanded ? 'max-h-full' : 'max-h-0'
				}`}
			>
				{catEvents.map((event) => (
					<EventItem event={event} key={event.id} />
				))}
			</div>
		</div>
	);
}
