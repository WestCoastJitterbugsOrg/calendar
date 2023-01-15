import checked from '../assets/checkbox-checked.svg';
import indeterminate from '../assets/checkbox-indeterminate.svg';
import unchecked from '../assets/checkbox-unchecked.svg';
import { CategoryStore } from '../store/model';
import { stateContext } from '../store/StateWrapper';
import { getCategoryEvents } from '../store/utils';
import { useContext } from 'react';

type Props = {
	category: CategoryStore;
};

export function GroupCheckbox(props: Props) {
	const { events, setEvents } = useContext(stateContext);

	const catEvents = getCategoryEvents(props.category, events);

	const eventsShown = catEvents.filter((event) => event.showInCalendar).length;
	const [globalCheckState, imgSrc, alt] =
		// eslint-disable-next-line no-nested-ternary
		eventsShown === 0
			? [false, unchecked, '☐']
			: eventsShown === props.category.events.length
			? [true, checked, '☑']
			: ['mixed' as const, indeterminate, '▣'];

	const setAllChecked = (show: boolean) =>
		setEvents?.((prevEvents) => {
			const newEvents = { ...prevEvents };
			for (const eventId of props.category.events) {
				newEvents[eventId].showInCalendar = show;
			}
			return newEvents;
		});

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<img
			data-testid="group-checkbox"
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
			role="checkbox"
			className="bg-white text-2xl leading-4 text-black" // For looking good when alt
			aria-checked={globalCheckState}
			onClick={(e) => {
				e.stopPropagation();
				setAllChecked(globalCheckState !== true);
			}}
			src={imgSrc}
			width={16}
			height={16}
			alt={alt}
		/>
	);
}
