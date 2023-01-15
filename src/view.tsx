import * as CW from './app/types/cogwork';
import { initContext } from './app/services/cogwork';
import { initApp } from './app';

/**
 * Listen for a custom event
 */

window.addEventListener(
	'cw-filter-events-loaded',
	(event: Event) => {
		if (!(event instanceof CustomEvent)) {
			throw Error('Expected event to be an instance of CustomEvent');
		}

		try {
			const element = document.getElementById('cwfc-wrapper');
			const response = event.detail as CW.OkResponse | null;
			if (
				element == null ||
				!(element instanceof Element) ||
				response == null
			) {
				throw Error('Could not load calendar!');
			}
			const data = initContext(response);
			initApp(element, data);
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
