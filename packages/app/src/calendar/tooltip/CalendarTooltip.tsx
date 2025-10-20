import style from './CalendarTooltip.module.scss';
import { EventApi, formatRange } from '@fullcalendar/core';
import { WCJ } from 'src/types';

type Props = {
	event: EventApi;
};

export function CalendarTooltip(props: Props) {
	const cwfcEvent = props.event.extendedProps as WCJ.Event;
	return (
		<div role="tooltip" className={style.tooltip}>
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
				<a
					className={style.about}
					href={cwfcEvent.registrationUrl}
					target="_blank"
					rel="noreferrer"
				>
					About event series
				</a>
			</div>
			<div id="wcj-arrow" data-popper-arrow className={style.arrow}></div>
		</div>
	);
}
