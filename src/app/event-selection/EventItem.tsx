/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import checked from '../assets/checkbox-checked.svg';
import unchecked from '../assets/checkbox-unchecked.svg';
import infoCircle from "../assets/info-circle.svg";
import { useContext } from 'react';
import { stateContext } from '../store/StateWrapper';
import * as WCJ from '../types/wcj';

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
		<div className="m-2 flex min-h-[32px] items-center" role="listitem">
			<img
				data-testid="info-button"
				src={infoCircle}
				className="mr-2 block h-4 w-4 flex-none cursor-pointer text-black opacity-50 hover:opacity-100"
				onClick={() => setEventModal?.(props.event.id)}
			/>
			<div
				data-testid="event-item"
				className="flex flex-grow items-center"
				onClick={toggle}
			>
				<span
					className={`flex-grow cursor-pointer pr-2 leading-tight ${
						props.event.showInCalendar ? 'opacity-100' : 'opacity-50'
					}`}
				>
					{props.event.title}
				</span>
				<span
					role="checkbox"
					data-testid="event-checkbox"
					aria-readonly
					aria-checked={props.event.showInCalendar}
					className="cursor-pointer"
				>
					{props.event.showInCalendar ? (
						<img src={checked} width={16} height={16} alt="☑" />
					) : (<img src={unchecked} width={16} height={16} alt="☐" />)}
				</span>
			</div>
		</div>
	);
}
