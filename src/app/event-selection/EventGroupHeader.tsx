import checked from '../assets/checkbox-checked.svg';
import indeterminate from '../assets/checkbox-indeterminate.svg';
import unchecked from '../assets/checkbox-unchecked.svg';
import plusIcon from '../assets/plus.svg';
import StateContext, { CategoryStore, EventStore } from '../store/model';
import { getCategoryEvents } from '../store/utils';
import { WCJ } from '../types';
import style from './EventGroupHeader.module.scss';

type Props = {
	category: CategoryStore;
	events: EventStore['events'];
	expanded: boolean;
	toggleExpanded: () => void;
	setEvents: StateContext['setEvents'];
};

export function EventGroupHeader(props: Props) {
	const catEvents = getCategoryEvents(props.category, props.events);
	const { state, img, alt } = useGroupCheckboxState(catEvents);

	const setAllChecked = (show: boolean) =>
		props.setEvents?.((prevEvents) => {
			const newEvents = { ...prevEvents };
			for (const eventId of props.category.events) {
				newEvents[eventId].showInCalendar = show;
			}
			return newEvents;
		});

	return (
		<button
			type="button"
			aria-expanded={props.expanded}
			aria-controls={`Event group ${props.category.id}`}
			className={style.headerWrapper}
			onClick={props.toggleExpanded}
		>
			<div className={style.headerText}>
				<img
					alt="+"
					className={
						style.expandIcon + (props.expanded ? ' ' + style.rotate : '')
					}
					src={plusIcon}
				/>
				<span>{props.category.id}</span>
			</div>

			<div
				role="checkbox"
				className={style.checkboxWrapper}
				aria-checked={state}
				tabIndex={0}
				onClick={(e) => {
					e.stopPropagation();
					setAllChecked(state !== true);
				}}
				onKeyUp={(e) => {
					if (['Enter', 'Space'].includes(e.code)) {
						e.preventDefault();
						e.stopPropagation();
						setAllChecked(state !== true);
					}
				}}
			>
				<img
					data-testid="group-checkbox"
					className={style.checkbox}
					src={img}
					width={16}
					height={16}
					alt={alt}
				/>
			</div>
		</button>
	);
}

type GroupCheckboxState = {
	state: boolean | 'mixed';
	img: string | undefined;
	alt: string;
};

function useGroupCheckboxState(events: WCJ.Event[]): GroupCheckboxState {
	const eventsShown = events.filter((event) => event.showInCalendar).length;
	switch (eventsShown) {
		case 0:
			return {
				state: false,
				img: unchecked,
				alt: '☐',
			};
		case events.length:
			return {
				state: true,
				img: checked,
				alt: '☑',
			};
		default:
			return {
				state: 'mixed',
				img: indeterminate,
				alt: '▣',
			};
	}
}
