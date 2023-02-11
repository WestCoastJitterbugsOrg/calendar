import { appContainer, appTag } from './app-container';
import { SpinLoader } from './spin-loader';
import './view.scss';
import { initContext } from '@app/services/cogwork';
import CW from '@app/types/cogwork';
import { lazy, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';

const App = lazy(() => import('@app/App'));

let shadowRoot: ShadowRoot | undefined;
let styleElement: Node | undefined;

window.addEventListener(
	'cw-filter-events-loaded',
	(event: Event) => {
		if (!(event instanceof CustomEvent)) {
			throw Error('Expected event to be an instance of CustomEvent');
		}

		try {
			const element = document.getElementById('cwfc-wrapper');
			if (!(element instanceof Element) || !isOkResponseEvent(event)) {
				throw Error('Could not load calendar!');
			}

			shadowRoot = element.attachShadow({ mode: 'open' });
			shadowRoot.appendChild(appContainer);

			if (styleElement) {
				shadowRoot.appendChild(styleElement);
			}
			const data = initContext(event.detail.events);

			render(
				<StrictMode>
					<Suspense fallback={<SpinLoader />}>
						<App {...data} colors={event.detail.colors} />
					</Suspense>
				</StrictMode>,
				appTag
			);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(
				`
                    An error occured in CW Filter Calendar!
                    Please contact it@wcj.se with the error message:
                `,
				error
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
		styleElement = event.detail;
		if (shadowRoot) {
			shadowRoot.appendChild(styleElement);
		}
	},
	{ once: true }
);

function isOkResponse(detail: unknown): detail is CW.OkResponse {
	return (
		detail != null &&
		typeof detail === 'object' &&
		'events' in detail &&
		'colors' in detail
	);
}

function isOkResponseEvent(
	event: CustomEvent
): event is CustomEvent<CW.OkResponse> {
	return event instanceof CustomEvent && isOkResponse(event.detail);
}
