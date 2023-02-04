import { MaybeArray } from '../../types/utils';
import style from './Button.module.scss';

type Props = {
	size?: 'sm' | 'lg';
	onClick?: () => void;
	children: MaybeArray<JSX.Element | string>;
};

export function Button(props: Props) {
	return (
		<button
			type="button"
			className={`${style.button} ${
				props.size == null ? '' : style[props.size]
			}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
