import { useGroupCheckboxState } from 'src/hooks/group-checkbox-state';
import checkedImg from '../assets/checkbox-checked.svg';
import indeterminateImg from '../assets/checkbox-indeterminate.svg';
import uncheckedImg from '../assets/checkbox-unchecked.svg';
import plusImg from '../assets/plus.svg';
import style from './EventGroupHeader.module.scss';
import { WCJ } from 'src/types';

type Props = {
	category: string;
	events: WCJ.Event[];
	expanded: boolean;
	toggleExpanded: () => void;
	toggleGroupChecked: () => void;
};

export function EventGroupHeader(props: Props) {
	const categoryEvents = props.events;
	const state = useGroupCheckboxState(categoryEvents);

	let img: string | undefined;
	let alt: string;

	switch (state) {
		case false:
			img = uncheckedImg;
			alt = '☐';
			break;
		case true:
			img = checkedImg;
			alt = '☑';
			break;
		default:
			img = indeterminateImg;
			alt = '▣';
			break;
	}

	return (
		<button
			type="button"
			aria-expanded={props.expanded}
			aria-controls={`Event group ${props.category}`}
			className={style.headerWrapper}
			onClick={props.toggleExpanded}
		>
			<div className={style.headerText}>
				<img
					alt="+"
					className={
						style.expandIcon + (props.expanded ? ' ' + style.rotate : '')
					}
					src={plusImg}
				/>
				<span>{props.category}</span>
			</div>

			<div
				role="checkbox"
				className={style.checkboxWrapper}
				aria-checked={state}
				tabIndex={0}
				onClick={(e) => {
					e.stopPropagation();
					props.toggleGroupChecked();
				}}
				onKeyUp={(e) => {
					if (['Enter', 'Space'].includes(e.code)) {
						e.preventDefault();
						e.stopPropagation();
						props.toggleGroupChecked();
					}
				}}
			>
				<img
					className={style.checkbox}
					src={img}
					width={16}
					height={16}
					alt={alt}
				/>
			</div>
		</button>
	);
}
