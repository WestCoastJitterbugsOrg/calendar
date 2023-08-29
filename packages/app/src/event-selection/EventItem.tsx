import checked from '../assets/checkbox-checked.svg';
import unchecked from '../assets/checkbox-unchecked.svg';
import infoCircle from '../assets/info-circle.svg';
import { stateContext } from '../store/StateWrapper';
import style from './EventItem.module.scss';
import { useContext } from 'react';
import { WCJ } from 'src/types';

type Props = {
	event: WCJ.Event;
	expanded: boolean;
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
				<img alt="info" src={infoCircle} className={style.infoButton} />
				<span
					className={
						style.title +
						(props.event.showInCalendar ? ' ' + style.showInCalendar : '')
					}
				>
					{props.event.title}
				</span>
			</button>
			<div
				role="checkbox"
				aria-checked={props.event.showInCalendar}
				tabIndex={props.expanded ? 0 : -1}
				className={style.checkbox}
				onClick={toggle}
				onKeyUp={(e) => {
					if (['Enter', 'Space'].includes(e.code)) {
						e.stopPropagation();
						e.preventDefault();
						toggle();
					}
				}}
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
