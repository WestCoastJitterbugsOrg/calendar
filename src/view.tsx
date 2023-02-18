import { appContainer, appTag as appDiv } from './app-container';
import './view.scss';
import CW from '@app/types/cogwork';

let shadowRoot: ShadowRoot | undefined;
let styleElement: Node | undefined;

window.addEventListener(
	'cw-filter-events-loaded',
	(event) => {
		try {
			const element = document.querySelector(
				'.wp-block-cw-addons-cw-filter-calendar'
			);
			if (element == null) {
				throw Error('Could not load calendar!');
			}

			shadowRoot = element.attachShadow({ mode: 'open' });
			shadowRoot.appendChild(appContainer);

			if (styleElement) {
				shadowRoot.appendChild(styleElement);
			}

			import('@app/index')
				.then((app) =>
					app.render((event as CustomEvent<CW.Response>).detail, appDiv)
				)
				.catch((error: Error) => {
					appDiv.innerHTML = `Error!\n<pre>${JSON.stringify(error.message)}`;
					throw new Error('Wordpress cwfc plugin rendering error', {
						cause: error,
					});
				});
		} catch (error) {
			throw new Error(
				`
                    An error occured in CW Filter Calendar!
                    Please contact it@wcj.se with the error message:
                `,
				{ cause: error }
			);
		}
	},
	{ once: true }
);

window.addEventListener(
	'cw-filter-style-loaded',
	(event) => {
		if (!(event instanceof CustomEvent) || !(event.detail instanceof Node)) {
			throw Error(
				'Expected event to be an instance of CustomEvent containing detail of type Node'
			);
		}
		if (shadowRoot) {
			shadowRoot.appendChild(event.detail);
		}
	},
	{ once: true }
);
