import type { EventStore } from 'src/store/model';

export const mockStore: EventStore = {
	categories: {
		'Lindy Hop': {
			events: ['1'],
			id: 'Lindy Hop',
		},
	},
	eventModal: undefined,
	events: {
		'1': {
			id: '1',
			category: 'Lindy Hop',
			instructors: undefined,
			occasions: [
				{
					start: new Date('2022-01-01 18:00'),
					end: new Date('2022-01-01 20:00'),
				},
			],
			place: 'Forum',
			price: '1337',
			registrationUrl: 'https://example.com/registration',
			title: 'Grundkurs Lindy Hop',
			description: '',
			showInCalendar: true,
		},
	},
};
