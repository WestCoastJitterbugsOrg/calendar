import { MaybeArray } from '.';

export type Event = {
	'@attributes': { eventId: string };
	title: string;
	longdescription?: string;
	schedule?: Schedule;
	category?: string;
	primaryEventGroup?: string;
	requirements: MaybeArray<{
		level: { '@attributes': { minValue: number } };
	}>;
	registration: MaybeArray<{
		'@attributes': { status: 'ONLY_INFO' | 'STOPED_SHOWING' | 'OPEN' };
		url: string;
	}>;
	place?: string;
	pricing?: {
		base: string;
	};
	instructors?: { combinedTitle: string };
}

export type Schedule = {
	occasions?: {
		occasion: MaybeArray<Occasion>;
	};
	startDate?: string;
	startTime?: string;
	endDate?: string;
	endTime?: string;
}

export type Occasion = {
	startDateTime?: string;
	endDateTime?: string;
}

export type Response = {
	type: 'error',
	data: ErrorResponse
} | {
	type: 'ok',
	data: OkResponse
}

export type ErrorResponse = {
	error: unknown
}

export type OkResponse = {
	events: {
		event: MaybeArray<Event>;
	};
}
