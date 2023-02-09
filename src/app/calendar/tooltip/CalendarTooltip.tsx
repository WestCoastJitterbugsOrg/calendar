import style from './CalendarTooltip.module.scss';
import { WCJ } from '@app/types';
import { EventApi, formatRange } from '@fullcalendar/core';

type Props = {
	event: EventApi;
	openModal: () => void;
};

export function CalendarTooltip(props: Props) {
	const cwfcEvent = props.event.extendedProps as WCJ.Event;
	return (
		<div id="wcj-tooltip" role="tooltip" className={style.tooltip}>
			<div className={style.title}>{props.event.title}</div>
			<div>
				{props.event.start &&
					props.event.end &&
					formatRange(props.event.start, props.event.end, {
						hour12: false,
						hour: '2-digit',
						minute: '2-digit',
					})}
			</div>
			<div>{cwfcEvent.place}</div>
			<div>{cwfcEvent.instructors}</div>
			<div>
				<button type="button" className={style.about} onClick={props.openModal}>
					About event series
				</button>
			</div>
			<div id="wcj-arrow" data-popper-arrow className={style.arrow}></div>
		</div>
	);
}
