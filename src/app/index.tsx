import App from './App';
import { initContext } from './services/cogwork';
import { StrictMode } from 'react';
import { render as reactRender } from 'react-dom';
import type { CW } from 'types';

export function render(response: CW.Response, container: Element) {
	if (response.type === 'error') {
		throw new Error('Response returned error', {
			cause: response.data,
		});
	}
	const data = initContext(response.data.events);
	return reactRender(
		<StrictMode>
			<App {...data} colors={response.data.colors} />
		</StrictMode>,
		container
	);
}
