import style from './Loader.module.scss';

export function Loader() {
	return (
		<div className={style.loaderContainer}>
			<div className={style.loader}></div>
		</div>
	);
}
