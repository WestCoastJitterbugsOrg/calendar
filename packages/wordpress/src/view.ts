import './view.scss';
import { init as lrInit } from 'logrocket';
import { WpCwfc } from '@cwfc/shared';
import { render } from './render';

declare const wpCwfcEnv: 'development' | 'production';
declare const wpCwfc: WpCwfc;

if (wpCwfcEnv === 'production') {
	lrInit('iwnlra/cogwork-interactive-calendar');
}

const rootElementSelector = '.wp-block-cw-addons-cw-filter-calendar';

window.onload = () => {
	const rootElement = document.querySelector(rootElementSelector);
	if (rootElement == null) {
		throw Error(`Kunde inte hitta matchande selector "${rootElementSelector}"`);
	}
	render(rootElement, wpCwfc);
};
