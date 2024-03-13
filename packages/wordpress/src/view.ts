import './view.scss';
import { WpCwfc } from '@cwfc/shared';
import { render } from './render';

declare const wpCwfc: WpCwfc;

const rootElementSelector = '.wp-block-cw-addons-cw-filter-calendar';

window.onload = () => {
	const rootElement = document.querySelector(rootElementSelector);
	if (rootElement == null) {
		throw Error(
			`Could not find element matching selector "${rootElementSelector}"`,
		);
	}
	render(rootElement, wpCwfc);
};
