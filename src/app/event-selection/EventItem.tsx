/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import checked from '../assets/checkbox-checked.svg';
import unchecked from '../assets/checkbox-unchecked.svg';
import infoCircle from '../assets/info-circle.svg';
import { useContext } from 'react';
import { stateContext } from '../store/StateWrapper';
import * as WCJ from '../types/wcj';
import { default as style } from './EventItem.module.scss';

type Props = {
	event: WCJ.Event;
};

export function EventItem(props: Props) {
	const { setEvents, setEventModal } = useContext(stateContext);

	const toggle = () =>
		setEvents?.((prevEvents) => ({
			...prevEvents,
			[props.event.id]: {
				...prevEvents[props.event.id],
				showInCalendar: !prevEvents[props.event.id].showInCalendar,
			},
		}));

	return (
		<div className={style.wrapper} role="listitem">
			<div
				className={style.content}
				onClick={() => setEventModal?.(props.event.id)}
			>
				<img
					data-testid="info-button"
					src={infoCircle}
					className={style.infoButton}
				/>
				<span
					className={
						style.title +
						(props.event.showInCalendar ? ' ' + style.showInCalendar : '')
					}
				>
					{props.event.title}
				</span>
			</div>
			<div
				role="checkbox"
				data-testid="event-checkbox"
				aria-checked={props.event.showInCalendar}
				tabIndex={0}
				className={style.checkbox}
				onClick={toggle}
			>
				{props.event.showInCalendar ? (
					<img src={checked} width={16} height={16} alt="☑" />
				) : (
					<img src={unchecked} width={16} height={16} alt="☐" />
				)}
			</div>
		</div>
	);
}
