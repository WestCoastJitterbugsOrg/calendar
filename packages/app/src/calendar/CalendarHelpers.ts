import { EventInput, EventSourceInput } from '@fullcalendar/core';
import { WCJ } from 'src/types';

export function wcj2fcEvent(wcjEvent: WCJ.Event): EventSourceInput {
	return {
		id: wcjEvent.id,
		events: wcjEvent.occasions.map(
			(occasion): EventInput => ({
				id: `${
					wcjEvent.id
				}-${occasion.start.toISOString()}-${occasion.end.toISOString()}`,
				title: wcjEvent.title,
				start: occasion.start,
				end: occasion.end,
				groupId: wcjEvent.id,
				extendedProps: wcjEvent,
			}),
		),
	};
}
