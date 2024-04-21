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
	toggleChecked: () => void;
	clickInfoButton: () => void;
};

export function EventItem(props: Props) {
	const { checkedEvents } = useContext(stateContext);

	const isChecked = checkedEvents.includes(props.event.id);

	return (
		<div className={style.wrapper} role="listitem">
			<button
				className={style.content}
				onClick={() => {
					props.clickInfoButton();
				}}
				tabIndex={props.expanded ? 0 : -1}
				onKeyUp={(e) => {
					if (['Enter', 'Space'].includes(e.code)) {
						e.stopPropagation();
						props.clickInfoButton();
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
					props.toggleChecked();
				}}
				onKeyUp={(e) => {
					if (['Enter', 'Space'].includes(e.code)) {
						e.stopPropagation();
						e.preventDefault();
						props.toggleChecked();
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
