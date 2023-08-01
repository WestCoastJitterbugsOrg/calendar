import AppInit from './AppInit';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { WpCwfc } from 'shared/types';
import { SWRConfig } from 'swr';

export function renderCwfc(data: WpCwfc, container: Element) {
	return createRoot(container).render(
		<StrictMode>
			<SWRConfig value={{ provider: localStorageProvider }}>
				<AppInit {...data} />
			</SWRConfig>
		</StrictMode>
	);
}

function localStorageProvider() {
	// When initializing, we restore the data from `localStorage` into a map.
	const map = new Map(
		JSON.parse(localStorage.getItem('cwfc-cache') ?? '[]') as [string, object][]
	);

	// Before unloading the app, we write back all the data into `localStorage`.
	window.addEventListener('beforeunload', () => {
		const appCache = JSON.stringify(Array.from(map.entries()));
		localStorage.setItem('cwfc-cache', appCache);
	});

	// We still use the map for read & write performance.
	return map;
}
