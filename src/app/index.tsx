import { StrictMode, lazy, Suspense } from 'react';
import { render } from 'react-dom';
import * as WCJ from './types/wcj';

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
		<div className="spinLoader">
			<div className="spinner"></div>
		</div>
	);
}
