import style from './index.module.scss';
import WCJ from './types/wcj';
import { lazy, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';

const App = lazy(() => import('./App'));

export function initApp(el: Element, data: WCJ.Context) {
	render(
		<StrictMode>
			<Suspense fallback={<SpinLoader />}>
				<App {...data} />
			</Suspense>
		</StrictMode>,
		el
	);
}

function SpinLoader() {
	return (
		<div className={style.spinLoader}>
			<div className={style.spinner}></div>
		</div>
	);
}
