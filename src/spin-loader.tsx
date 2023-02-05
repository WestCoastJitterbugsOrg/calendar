import style from './spin-loader.module.scss';

export function SpinLoader() {
	return (
		<div className={style.spinLoader}>
			<div className={style.spinner}></div>
		</div>
	);
}
