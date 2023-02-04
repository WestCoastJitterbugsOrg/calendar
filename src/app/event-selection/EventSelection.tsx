import { Button } from '../shared/Buttons/Button';
import { stateContext } from '../store/StateWrapper';
import { useContext } from 'react';
import { EventGroup } from './EventGroup';
import * as WCJ from '../types/wcj';
import style from './EventSelection.module.scss';

export function EventSelection() {
	const { categories, setEvents } = useContext(stateContext);

	const select = (show: boolean) => {
		setEvents?.((events) => {
			const newEvents: Record<string, WCJ.Event> = {};
			for (const eventId in events) {
				newEvents[eventId] = {
					...events[eventId],
					showInCalendar: show,
				};
			}
			return newEvents;
		});
	};

	return (
		<>
			<div className={style.actionButtons}>
				<Button onClick={() => select(true)}>Select all</Button>
				<Button onClick={() => select(false)}>Deselect all</Button>
			</div>
			<div
				className={style.eventGroupList}
				data-testid="event-selection-groups"
				role="list"
			>
				{Object.keys(categories).map((categoryId) => (
					<EventGroup key={categoryId} category={categoryId} />
				))}
			</div>
		</>
	);
}
