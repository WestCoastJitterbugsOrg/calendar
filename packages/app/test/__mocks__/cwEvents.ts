import type { CW } from 'src/types';
import type { MaybeArray } from 'src/types/utils';

export const defaultColors = {
	primary: '#ab2814',
	'primary-alt': '#ec6350',
	secondary: '#349995',
	'secondary-alt': '#73bdba',
	dark: '#1d1d1b',
	light: '#fffaf2',
};

export const defaultEventData: MaybeArray<CW.Event> = [
	{
		'@attributes': {
			eventId: '1',
		},
		category: 'Lindy Hop',
		instructors: {
			combinedTitle: '',
		},
		schedule: {
			occasions: {
				occasion: {
					startDateTime: '2022-01-01 18:00',
					endDateTime: '2022-01-01 20:00',
				},
			},
		},
		place: 'Forum',
		pricing: {
			base: '1337',
		},
		registration: {
			'@attributes': {
				status: 'OPEN',
			},
			url: 'https://example.com/registration',
		},
		title: 'Grundkurs Lindy Hop',
		primaryEventGroup: 'Lindy Hop',
		requirements: {
			level: {
				'@attributes': {
					minValue: 0,
				},
			},
		},
	},
];
