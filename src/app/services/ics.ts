import Wcj from '@app/types/wcj';

export async function wcj2ics(events: Wcj.Event[]) {
	const { VCALENDAR, VEVENT } = await import('ics-js');
	const calendar = new VCALENDAR();
	calendar.addProp('PRODID', 'WCJ personal calendar');
	calendar.addProp('VERSION', 1);

	for (const event of events) {
		for (const occ of event.occasions) {
			const vevent = new VEVENT();
			vevent.addProp('UID');
			vevent.addProp('DTSTART', new Date(occ.start));
			vevent.addProp('DTEND', new Date(occ.end));
			vevent.addProp('DTSTAMP', new Date());
			vevent.addProp('SUMMARY', event.title);
			vevent.addProp('DESCRIPTION', event.description);
			vevent.addProp('URL', event.registrationUrl);
			vevent.addProp('LOCATION', event.place);
			vevent.addProp('CATEGORIES', [event.category]);
			calendar.addComponent(vevent);
		}
	}
	return calendar.toString();
}

export async function exportICS(events: Record<string, Wcj.Event>) {
	const selectedEvents = Object.values(events).filter(
		(event) => event.showInCalendar
	);
	const icsStr = await wcj2ics(selectedEvents);

	const file = new Blob([icsStr], { type: 'text/calendar' });
	const url = URL.createObjectURL(file);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'wcj-events.ics';
	document.body.appendChild(a);
	a.click();
	return setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	});
}
