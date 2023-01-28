import { default as style } from './EventInfoTable.module.scss';

type Props = {
	title: string;
	value?: string;
};

export function EventOverviewTableRow(props: Props) {
	if (props.value == null) {
		return <></>;
	}
	return (
		<tr>
			<td className={style.rowTitle}>
				{props.title}
			</td>
			<td className={style.rowValue}>{props.value}</td>
		</tr>
	);
}
