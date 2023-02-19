import './view.scss';
import CW from '@app/types/cogwork';

const rootElementSelector = '.wp-block-cw-addons-cw-filter-calendar';
let shadowRoot: ShadowRoot | undefined;

const loader = document.createElement('div');
loader.classList.add('loader-container');
loader.innerHTML = '<div class="loader"></div>';

const appDiv = document.createElement('div');

// This event is emitted by the script that is added by our PHP cwfc_block_render_callback.
// It contains all
window.addEventListener(
	'cw-filter-events-loaded',
	(event) => {
		const rootElement = document.querySelector(rootElementSelector);
		if (rootElement == null) {
			throw Error(
				`Could not find element matching selector "${rootElementSelector}"`
			);
		}

		rootElement.append(appDiv);
		rootElement.append(loader);

		shadowRoot = appDiv.attachShadow({ mode: 'open' });

		import('@app/index')
			.then((app) => {
				const appContainer = document.createElement('div');
				shadowRoot?.appendChild(appContainer);
				app.render((event as CustomEvent<CW.Response>).detail, appContainer);
				loader.remove();
			})
			.catch((error: Error) => {
				rootElement.innerHTML = `Error!\n<pre>${JSON.stringify(error.message)}`;
				throw new Error('Wordpress cwfc plugin rendering error', {
					cause: error,
				});
			});
	},
	{ once: true }
);

// This event is emitted by our custom MiniCssExtractPlugin insert function in webpack.config.js
// It contains all the style for the app, so we attach it to the shadow root.
window.addEventListener(
	'cw-filter-style-loaded',
	(event) => {
		shadowRoot?.appendChild((event as CustomEvent).detail);
	},
	{ once: true }
);
