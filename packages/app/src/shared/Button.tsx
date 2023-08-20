import style from './Button.module.scss';
import type { MaybeArray } from 'src/types/utils';

type Props = {
	size?: 'sm' | 'lg';
	onClick?: () => void;
	children: MaybeArray<JSX.Element | string>;
	type?: 'primary' | 'ghost';
};

export function Button(props: Props) {
	return (
		<button
			type="button"
			className={`${style.button} ${
				props.size == null ? '' : style[props.size]
			} ${props.type === 'ghost' ? style[props.type] : ''}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
