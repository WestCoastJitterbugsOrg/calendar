import checked from '../assets/checkbox-checked.svg';
import indeterminate from '../assets/checkbox-indeterminate.svg';
import unchecked from '../assets/checkbox-unchecked.svg';
import plusIcon from '../assets/plus.svg';
import StateContext, { CategoryStore, EventStore } from '../store/model';
import { getCategoryEvents } from '../store/utils';
import { WCJ } from '../types';

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
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			className="flex min-h-[32px] cursor-pointer flex-row items-center bg-secondary p-2 font-bold text-white"
			onClick={props.toggleExpanded}
		>
			<div className="flex flex-grow items-center">
				{/* eslint-disable-next-line jsx-a11y/alt-text*/}
				<img
					className={`h-4 w-4 flex-shrink-0 transform transition duration-200 ${
						props.expanded ? 'rotate-45' : ''
					}`}
					src={plusIcon}
				/>
				<span className="ml-2">{props.category.id}</span>
			</div>

			<div className="flex">
				{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events*/}
				<img
					data-testid="group-checkbox"
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
					role="checkbox"
					className="bg-white text-2xl leading-4 text-black" // For looking good when alt
					aria-checked={state}
					onClick={(e) => {
						e.stopPropagation();
						setAllChecked(state !== true);
					}}
					src={img}
					width={16}
					height={16}
					alt={alt}
				/>
			</div>
		</div>
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
