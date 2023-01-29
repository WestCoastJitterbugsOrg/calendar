import { EventOverviewTableRow } from './EventInfoTableRow';
import * as WCJ from '../../types/wcj';
import style from './EventInfoTable.module.scss';

type Props = {
	event: WCJ.Event;
};

export function EventInfoTable(props: Props) {
	let first = Number.MAX_SAFE_INTEGER;
	let last = Number.MIN_SAFE_INTEGER;

	for (const occ of props.event.occasions) {
		first = Math.min(first, occ.start.getTime());
		last = Math.max(last, occ.start.getTime());
	}

	const displayDate = (time: number) =>
		new Date(time).toLocaleString('en-GB', {
			dateStyle: 'medium',
			timeZone: 'UTC',
		});

	const dateInterval = `${displayDate(first)} - ${displayDate(last)}`;

	return (
		<table className={style.table}>
			<tbody>
				<EventOverviewTableRow title="Where" value={props.event.place} />
				<EventOverviewTableRow title="When" value={dateInterval} />
				<EventOverviewTableRow
					title="Instructors"
					value={props.event.instructors}
				/>
				<EventOverviewTableRow title="Price" value={props.event.price} />
			</tbody>
		</table>
	);
}
