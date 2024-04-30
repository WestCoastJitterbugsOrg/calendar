import style from './ErrorViewer.module.scss';
import { error as lrError } from 'logrocket';
import { useEffect } from 'react';

type Props = {
	message: string;
};

export function ErrorViewer(props: Props) {
	useEffect(() => {
		lrError(props.message);
	}, [props.message]);

	return (
		<div className={style.wrapper}>
			<h1>Ett fel inträffade!</h1>
			<pre className={style.message}>{props.message}</pre>
		</div>
	);
}
