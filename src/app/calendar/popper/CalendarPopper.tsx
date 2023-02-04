/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { EventInfoTable } from '@app/shared/EventInfoTable/EventInfoTable';
import { EventApi, formatRange } from '@fullcalendar/core';
import { WCJ } from 'src/app/types';
import style from './CalendarPopper.module.scss';

type Props = {
	event: EventApi;
	openModal: () => void;
};

export function TooltipComponent(props: Props) {
	return (
		<div id="wcj-tooltip" role="tooltip" className={style.tooltip}>
			<div className={style.title}>{props.event.title}</div>
			<div className={style.date}>
				{props.event.start &&
					props.event.end &&
					formatRange(props.event.start, props.event.end, {
						hour12: false,
						hour: '2-digit',
						minute: '2-digit',
					})}
			</div>
			<EventInfoTable event={props.event.extendedProps as WCJ.Event} />
			<div>
				<div className={style.about} onClick={props.openModal}>
					About event series
				</div>
			</div>
			<div id="wcj-arrow" data-popper-arrow className={style.arrow}></div>
		</div>
	);
}
