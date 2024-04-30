import { Button } from '../shared/Button';
import { stateContext } from '../state';
import { EventGroup } from './EventGroup';
import style from './EventSelection.module.scss';
import { useCallback, useContext } from 'react';

type Props = {
	isLoading: boolean;
	setCheckedEvents: (events: string[]) => void;
	setEventModal: (eventId: string) => void;
};

export function EventSelection(props: Props) {
	const { events, categories, checkedEvents } = useContext(stateContext);

	const setEventCheckboxState = useCallback(
		(eventId: string, check: boolean) => {
			const checkedEventsSet = new Set(checkedEvents);
			if (check) {
				checkedEventsSet.add(eventId);
			} else {
				checkedEventsSet.delete(eventId);
			}
			props.setCheckedEvents([...checkedEventsSet]);
		},
		[props, checkedEvents],
	);

	const setGroupCheckboxState = useCallback(
		(categoryId: string, state: boolean | 'mixed') => {
			const catEventIds = events
				.filter((e) => e.category === categoryId)
				.map((e) => e.id);

			// Start by unchecking all events in the category
			const newCheckedEvents = checkedEvents.filter(
				(eventId) => !catEventIds.includes(eventId),
			);

			if (state === true) {
				// If the tri-state-checkbox should become checked, add all events in the category
				newCheckedEvents.push(...catEventIds);
			}

			props.setCheckedEvents(newCheckedEvents);
		},
		[props, events, checkedEvents],
	);

	return (
		<>
			<div className={style.actionButtons}>
				<Button
					onClick={() => {
						props.setCheckedEvents(events.map((event) => event.id));
					}}
				>
					Markera allt
				</Button>
				<Button
					onClick={() => {
						props.setCheckedEvents([]);
					}}
				>
					Avmarkera allt
				</Button>
			</div>
			<div className={style.eventGroupList} role="list">
				{categories.map((categoryId) => (
					<EventGroup
						key={categoryId}
						category={categoryId}
						setGroupCheckboxState={(state) => {
							setGroupCheckboxState(categoryId, state);
						}}
						setEventCheckboxstate={setEventCheckboxState}
						setEventModal={props.setEventModal}
					/>
				))}

				{props.isLoading && (
					<div className={style.loader}>
						<div className={style.loaderBar}></div>
					</div>
				)}
			</div>
		</>
	);
}
