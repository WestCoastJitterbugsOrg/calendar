import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import WCJ from './types/wcj';

const App = lazy(() => import('./App'));


export function initApp(el: Element, data: WCJ.Context) {
	const root = createRoot(el);
	root.render(
		<StrictMode>
			<Suspense fallback={<SpinLoader />}>
				<App data={data} />
			</Suspense>
		</StrictMode>
	);
}

function SpinLoader() {
    return (
        <div className="flex h-screen items-center justify-center bg-light">
            <div className="h-16 w-16 animate-spin rounded-[50%] border-8 border-solid border-t-primary-alt border-r-secondary border-b-primary border-l-secondary-alt"></div>
        </div>
    );
}