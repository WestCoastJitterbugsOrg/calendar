import './view.scss';
import LogRocket from 'logrocket';
import { WpCwfc } from '@cwfc/shared';
import { render } from './render';

declare const wpCwfcEnv: 'development' | 'production';
declare const wpCwfc: WpCwfc;

if (wpCwfcEnv === 'production') {
	try {
		LogRocket.init('iwnlra/cogwork-interactive-calendar');
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error("couldn't initialize logrocket", e);
	}
}

const rootElementSelector = '.wp-block-cw-addons-cw-filter-calendar';

window.onload = () => {
	const rootElement = document.querySelector(rootElementSelector);
	if (rootElement == null) {
		throw Error(
			`Could not find element matching selector "${rootElementSelector}"`,
		);
	}
	try {
		render(rootElement, wpCwfc);
	} catch (e) {
		rootElement.innerHTML = e?.toString() ?? '';
		// eslint-disable-next-line no-console
		console.error(e);
	}
};
