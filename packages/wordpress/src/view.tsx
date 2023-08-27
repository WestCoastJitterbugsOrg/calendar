import './view.scss';
import * as LogRocket from 'logrocket';
import type { WpCwfc } from '@cwfc/shared';

declare const wpCwfcEnv: 'development' | 'production';
declare const wpCwfc: WpCwfc;
let shadowRoot: ShadowRoot | undefined;

if (wpCwfcEnv === 'production') {
	LogRocket.init('iwnlra/cogwork-interactive-calendar');
}

const loader = document.createElement('div');
loader.classList.add('loader-container');
loader.innerHTML = '<div class="loader"></div>';

window.onload = () => {
	const rootElementSelector = '.wp-block-cw-addons-cw-filter-calendar';
	const appDiv = document.createElement('div');

	const rootElement = document.querySelector(rootElementSelector);
	if (rootElement == null) {
		throw Error(
			`Could not find element matching selector "${rootElementSelector}"`,
		);
	}

	rootElement.append(loader);
	rootElement.append(appDiv);
	shadowRoot = appDiv.attachShadow({ mode: 'open' });
	import('!!raw-loader!@cwfc/app/build/index.css')
		.then((style: { default: string }) => {
			const styleContainer = document.createElement('style');
			styleContainer.textContent = style.default;
			shadowRoot?.appendChild(styleContainer);
		})
		.catch((error: Error) => {
			throw new Error('Wordpress cwfc plugin style error', {
				cause: error,
			});
		});

	import('@cwfc/app')
		.then((app) => {
			const appContainer = document.createElement('div');
			shadowRoot?.appendChild(appContainer);
			app.render(wpCwfc, appContainer);
		})
		.catch((error: Error) => {
			rootElement.innerHTML = `<h1>Error!</h1>\n<pre style="white-space: break-spaces">${JSON.stringify(
				error.message,
			)}`;
			throw new Error('Wordpress cwfc plugin rendering error', {
				cause: error,
			});
		})
		.finally(() => {
			loader.remove();
		});
};
// This event is emitted by our custom MiniCssExtractPlugin insert function in webpack.config.js
// It contains all the style for the app, so we attach it to the shadow root.
window.addEventListener(
	'cw-filter-style-loaded',
	(event) => {
		shadowRoot?.appendChild((event as CustomEvent).detail);
	},
	{ once: true },
);
