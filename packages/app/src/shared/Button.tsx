import style from './Button.module.scss';
import { MaybeArray } from 'src/types/utils';

type Props = {
	size?: 'sm' | 'lg';
	onClick?: () => void;
	children: MaybeArray<JSX.Element | string>;
	type?: 'primary' | 'ghost' | 'link';
};

export function Button(props: Props) {
	return (
		<button
			type="button"
			className={`${style.button} ${
				props.size == null ? '' : style[props.size]
			} ${props.type == null ? '' : style[props.type]}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
