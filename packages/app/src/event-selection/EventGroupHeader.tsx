import { useContext } from 'react';
import checkedImg from '../assets/checkbox-checked.svg';
import indeterminateImg from '../assets/checkbox-indeterminate.svg';
import uncheckedImg from '../assets/checkbox-unchecked.svg';
import plusImg from '../assets/plus.svg';
import { stateContext } from '../state';
import style from './EventGroupHeader.module.scss';
import { WCJ } from 'src/types';

type Props = {
	category: string;
	events: WCJ.Event[];
	expanded: boolean;
	toggleExpanded: () => void;
};

export function EventGroupHeader(props: Props) {
	const { setCheckedEvents } = useContext(stateContext);
	const { state, img, alt } = useGroupCheckboxState(props.events);

	const toggleChecked = () => {
		setCheckedEvents?.((prevCheckedEvents) => {
			// Start by uncheck all events in the category
			const newCheckedEvents = prevCheckedEvents.filter(
				(eventId) => !props.events.find((e) => e.id === eventId),
			);

			if (state !== true) {
				// If the tristate-checkbox should become checked, add all events to the checked events
				newCheckedEvents.push(...props.events.map((e) => e.id));
			}

			return newCheckedEvents;
		});
	};

	return (
		<button
			type="button"
			aria-expanded={props.expanded}
			aria-controls={`Event group ${props.category}`}
			className={style.headerWrapper}
			onClick={props.toggleExpanded}
		>
			<div className={style.headerText}>
				<img
					alt="+"
					className={
						style.expandIcon + (props.expanded ? ' ' + style.rotate : '')
					}
					src={plusImg}
				/>
				<span>{props.category}</span>
			</div>

			<div
				role="checkbox"
				className={style.checkboxWrapper}
				aria-checked={state}
				tabIndex={0}
				onClick={(e) => {
					e.stopPropagation();
					toggleChecked();
				}}
				onKeyUp={(e) => {
					if (['Enter', 'Space'].includes(e.code)) {
						e.preventDefault();
						e.stopPropagation();
						toggleChecked();
					}
				}}
			>
				<img
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
	const { checkedEvents } = useContext(stateContext);
	const noOfCheckedEvents = events.filter((event) =>
		checkedEvents.includes(event.id),
	).length;

	switch (noOfCheckedEvents) {
		case 0:
			return {
				state: false,
				img: uncheckedImg,
				alt: '☐',
			};
		case events.length:
			return {
				state: true,
				img: checkedImg,
				alt: '☑',
			};
		default:
			return {
				state: 'mixed',
				img: indeterminateImg,
				alt: '▣',
			};
	}
}
