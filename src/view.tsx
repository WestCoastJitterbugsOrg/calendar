import { initApp } from './app';
import { appContainer, appTag } from './app-container';
import { initContext } from './app/services/cogwork';
import CW from './app/types/cogwork';
import './view.scss';

function isOkResponse(detail: unknown): detail is CW.OkResponse {
	return detail != null && typeof detail === 'object' && 'events' in detail;
}

function isOkResponseEvent(
	event: CustomEvent
): event is CustomEvent<CW.OkResponse> {
	return event instanceof CustomEvent && isOkResponse(event.detail);
}

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

			element.appendChild(appContainer);

			const data = initContext(event.detail);
			initApp(appTag, data);
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
