import style from './ErrorViewer.module.scss';

type Props = {
	message: string;
};

export function ErrorViewer(props: Props) {
	return (
		<div className={style.wrapper}>
			<h1>Error!</h1>
			<pre className={style.message}>{props.message}</pre>
		</div>
	);
}
