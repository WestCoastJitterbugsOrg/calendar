import './view.scss';

let shadowRoot: ShadowRoot | undefined;

const loader = document.createElement('div');
loader.classList.add('loader-container');
loader.innerHTML = '<div class="loader"></div>';

window.onload = () => {
	const rootElementSelector = '.wp-block-cw-addons-cw-filter-calendar';
	const appDiv = document.createElement('div');

	const rootElement = document.querySelector(rootElementSelector);
	if (rootElement == null) {
		throw Error(
			`Could not find element matching selector "${rootElementSelector}"`
		);
	}

	rootElement.append(loader);
	rootElement.append(appDiv);
	shadowRoot = appDiv.attachShadow({ mode: 'open' });

	import('app/index')
		.then((app) => {
			const appContainer = document.createElement('div');
			shadowRoot?.appendChild(appContainer);
			app.render(wpCwfc, appContainer);
		})
		.catch((error: Error) => {
			rootElement.innerHTML = `Error!\n<pre>${JSON.stringify(error.message)}`;
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
	{ once: true }
);
