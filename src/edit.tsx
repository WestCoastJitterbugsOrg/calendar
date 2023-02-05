import App from './app/App';
import { WCJ } from './app/types';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
// import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { WPElement } from '@wordpress/element/build-types';

// Setup start and stop dates for an example event to be shown in the edit view.
// The calendar will automatically go to the current date,
// so we take the next closest full hour as start and take two hours later as end date.
// This should assure that the event is visible when the calendar has loaded
const now = new Date();
const unixStart = new Date().setHours(now.getHours() + 1, 0);
const startDate = new Date(unixStart);
const unixEnd = new Date(unixStart).setHours(startDate.getHours() + 2);
const endDate = new Date(unixEnd);

const mockContext: WCJ.Context = {
	categories: {
		'Test Category': {
			id: 'Test Category',
			events: ['testEvent'],
		},
	},
	events: {
		testEvent: {
			id: 'testEvent',
			category: 'testCategory',
			occasions: [
				{
					start: startDate,
					end: endDate,
				},
			],
			registrationUrl: 'https://example.com/',
			title: 'Test Event',
			showInCalendar: true,
		},
	},
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 */
export default function Edit(): WPElement {
	return (
		<div {...useBlockProps()}>
			<App {...mockContext} />
		</div>
	);
}
