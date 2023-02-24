import App from './App';
import LogRocket from 'logrocket';
import { StrictMode } from 'react';
import { render as reactRender } from 'react-dom';
import { SWRConfig } from 'swr';

LogRocket.init('iwnlra/cogwork-interactive-calendar');

export function render(data: typeof wpCwfc, container: Element) {
	return reactRender(
		<StrictMode>
			<SWRConfig value={{ provider: localStorageProvider }}>
				<App {...data} />
			</SWRConfig>
		</StrictMode>,
		container
	);
}

function localStorageProvider() {
	// When initializing, we restore the data from `localStorage` into a map.
	const map = new Map(
		JSON.parse(localStorage.getItem('app-cache') ?? '[]') as [string, object][]
	);

	// Before unloading the app, we write back all the data into `localStorage`.
	window.addEventListener('beforeunload', () => {
		const appCache = JSON.stringify(Array.from(map.entries()));
		localStorage.setItem('app-cache', appCache);
	});

	// We still use the map for write & read for performance.
	return map;
}
