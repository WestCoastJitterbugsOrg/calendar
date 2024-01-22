import { EventStore } from 'src/state';

export const mockStore = {
	categories: ['Lindy Hop'],
	eventModal: undefined,
	events: [
		{
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
		},
	],
	checkedEvents: [],
} satisfies EventStore;
