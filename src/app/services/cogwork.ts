import { MaybeArray } from '../types/utils';
import * as CW from '../types/cogwork';
import * as WCJ from '../types/wcj';

export function initContext(data: CW.OkResponse): WCJ.Context {
	const response = asArray(data.events.event);

	const cogworkEvents = response.filter(
		(event) => event.schedule?.occasions?.occasion != null
	);

	const uncheckedEventsStr = localStorage.getItem('uncheckedEvents');
	const uncheckedEvents: string[] = uncheckedEventsStr
		? (JSON.parse(uncheckedEventsStr) as string[])
		: [];

	const categories: Record<string, { id: string; events: string[] }> = {};
	const events: Record<string, WCJ.Event> = {};

	for (const cogworkEvent of cogworkEvents) {
		const event = cogwork2wcjEvent(cogworkEvent);
		event.showInCalendar = !uncheckedEvents.includes(event.id);

		// Add event to store
		events[event.id] = event;

		// Add category if it hasn't been seen before,
		if (!(event.category in categories)) {
			categories[event.category] = { id: event.category, events: [] };
		}
		categories[event.category].events.push(event.id);
	}

	return {
		categories,
		events,
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