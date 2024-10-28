import { EventAttributes } from 'ics';
import { WCJ } from 'src/types';

export async function wcj2ics(events: WCJ.Event[]) {
	const { createEvents } = await import('ics');

	return createEvents(
		events.flatMap((event) =>
			event.occasions.map((occasion) => createEventAttribute(event, occasion)),
		),
	);
}

export async function exportICS(events: WCJ.Event[]) {
	const { value, error } = await wcj2ics(events);

	if (error || value == null) {
		return;
	}

	const file = new Blob([value], { type: 'text/calendar' });
	const url = URL.createObjectURL(file);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'cw-events.ics';
	document.body.appendChild(a);
	a.click();
	return setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	});
}

function createEventAttribute(
	event: WCJ.Event,
	occasion: WCJ.Occasion,
): EventAttributes {
	return {
		start: occasion.start.getTime(),
		end: occasion.end.getTime(),
		title: event.title,
		description:
			event.description == null ? undefined : stripHtml(event.description),
		htmlContent: event.description,
		url: event.registrationUrl,
		location: event.place,
		categories: [event.category],
	};
}

function stripHtml(html: string) {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	return doc.body.textContent || '';
}
