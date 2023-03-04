import type * as WCJ from '../shared';

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

export { mockContext };
