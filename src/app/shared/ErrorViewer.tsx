import style from './ErrorViewer.module.scss';
import LogRocket from 'logrocket';
import { useEffect } from 'react';

type Props = {
	message: string;
};

export function ErrorViewer(props: Props) {
	useEffect(() => {
		LogRocket.error(props.message);
	});
	return (
		<div className={style.wrapper}>
			<h1>Error!</h1>
			<pre className={style.message} data-testid="error-message">
				{props.message}
			</pre>
		</div>
	);
}
