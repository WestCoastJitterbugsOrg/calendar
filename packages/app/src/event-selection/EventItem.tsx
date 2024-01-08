import checkedImg from '../assets/checkbox-checked.svg';
import uncheckedImg from '../assets/checkbox-unchecked.svg';
import infoCircleImg from '../assets/info-circle.svg';
import { stateContext } from '../state';
import style from './EventItem.module.scss';
import { useContext } from 'react';
import { WCJ } from 'src/types';

type Props = {
	event: WCJ.Event;
	expanded: boolean;
};

export function EventItem(props: Props) {
	const { checkedEvents, setEventModal, setCheckedEvents } =
		useContext(stateContext);

	const isChecked = checkedEvents.includes(props.event.id);

	const toggleChecked = () => {
		setCheckedEvents?.((prevCheckedEvents) => {
			// Create a new array with the clicked event removed
			const newChecked = prevCheckedEvents.filter(
				(event) => event !== props.event.id,
			);
			if (newChecked.length === prevCheckedEvents.length) {
				// The event didn't exist in the array, so it should be added
				newChecked.push(props.event.id);
			}
			return newChecked;
		});
	};

	return (
		<div className={style.wrapper} role="listitem">
			<button
				className={style.content}
				onClick={() => setEventModal?.(props.event.id)}
				tabIndex={props.expanded ? 0 : -1}
				onKeyUp={(e) => {
					if (['Enter', 'Space'].includes(e.code)) {
						e.stopPropagation();
						setEventModal?.(props.event.id);
					}
				}}
			>
				<img alt="info" src={infoCircleImg} className={style.infoButton} />
				<span
					className={
						style.title + (isChecked ? ' ' + style.showInCalendar : '')
					}
				>
					{props.event.title}
				</span>
			</button>
			<div
				role="checkbox"
				aria-checked={isChecked}
				tabIndex={props.expanded ? 0 : -1}
				className={style.checkbox}
				onClick={() => {
					toggleChecked();
				}}
				onKeyUp={(e) => {
					if (['Enter', 'Space'].includes(e.code)) {
						e.stopPropagation();
						e.preventDefault();
						toggleChecked();
					}
				}}
			>
				{isChecked ? (
					<img src={checkedImg} width={16} height={16} alt="☑" />
				) : (
					<img src={uncheckedImg} width={16} height={16} alt="☐" />
				)}
			</div>
		</div>
	);
}
