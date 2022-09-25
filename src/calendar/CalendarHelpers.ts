import { EventInput, EventSourceInput } from "@fullcalendar/react";

export function wcj2fcEvent(wcjEvent: Wcj.Event): EventSourceInput {
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
      })
    ),
  };
}
