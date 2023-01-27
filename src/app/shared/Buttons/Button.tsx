import { MaybeArray } from '../../types/utils';
import { default as btnStyle } from './Button.module.scss';

type Props = {
	size?: 'sm' | 'lg';
	onClick?: () => void;
	children: MaybeArray<JSX.Element | string>;
};

export function Button(props: Props) {
	return (
		<button
			type="button"
			className={`${btnStyle.button} ${props.size === 'sm' ? btnStyle.sm : btnStyle.lg}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
