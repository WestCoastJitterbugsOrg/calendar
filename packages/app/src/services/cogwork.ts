import { CW, WCJ } from 'src/types';
import { MaybeArray } from 'src/types/utils';

export function initContext(cwEvents: MaybeArray<CW.Event>): WCJ.Context {
	const response = asArray(cwEvents);

	const cogworkEvents = response.filter(
		(event) => event.schedule?.occasions?.occasion != null,
	);

	const events = cogworkEvents.map(cogwork2wcjEvent);
	const categories = Array.from(new Set(events.map((event) => event.category)));

	let selectedEventIds: string[] = [];
	const uncheckedEventsStr = localStorage.getItem('uncheckedEvents');

	const uncheckedEvents = uncheckedEventsStr
		? (JSON.parse(uncheckedEventsStr) as string[])
		: [];
	selectedEventIds = events
		.map((event) => event.id)
		.filter((eventId) => !uncheckedEvents.includes(eventId));

	return {
		events,
		categories,
		selectedEventIds,
	};
}

function cogwork2wcjEvent(event: CW.Event): WCJ.Event {
	return {
		id: event['@attributes'].eventId,
		category:
			event.primaryEventGroup ??
			(typeof event.category === 'string' ? event.category : 'Övrigt'),
		title: event.title,
		occasions:
			event.schedule?.occasions == null
				? []
				: asArray(event.schedule.occasions.occasion)
						.map(cogwork2WcjOccasions)
						.filter((x): x is WCJ.Occasion => x != null),
		description: event.longdescription,
		registrationUrl: asArray(event.registration)[0]?.url,
		place: event.place,
		price: event.pricing?.base,
		instructors: event.instructors?.combinedTitle,
	};
}

function cogwork2WcjOccasions(occasions: CW.Occasion): WCJ.Occasion | null {
	const start = occasions.startDateTime;
	const end = occasions.endDateTime;

	if (start == null || end == null) {
		return null;
	}

	// Dates returned by the CogWork API doesn't follow the ISO8601 standard.
	// To make sure it works on all browsers, we need to replace empty spaces with T
	// Cogwork API: 2021-08-21 18:00:00
	// ISO 8601:    2021-08-21T18:00:00
	return {
		start: new Date(start.replace(' ', 'T')),
		end: new Date(end.replace(' ', 'T')),
	};
}

function asArray<T>(objOrArr: MaybeArray<T>) {
	if (Array.isArray(objOrArr)) {
		return objOrArr;
	}
	return [objOrArr];
}
