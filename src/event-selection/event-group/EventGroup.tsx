import EventItem from "../event/EventItem";
import { StateContext } from "@app/store/StateWrapper";
import { useContext, useState } from "react";
import { EventGroupHeader } from "./EventGroupHeader";

interface EventGroupProps {
  category: string;
}

export default function EventGroup({ category: categoryId }: EventGroupProps) {
  const [expanded, setExpanded] = useState(false);
  const { categories, events, setEvents } = useContext(StateContext);

  const category = categories[categoryId];
  const catEvents = category.events.reduce(
    (e, id) => [...e, events[id]],
    [] as Wcj.Event[]
  );

  const eventsShown = catEvents.filter((event) => event.showInCalendar).length;
  const globalCheckState =
    eventsShown === 0
      ? ("none" as const)
      : eventsShown === Object.keys(catEvents).length
      ? ("all" as const)
      : ("some" as const);

  if (category == null) {
    throw Error(`Category ${categoryId} does not exist in state`);
  }

  const setAllChecked = (show: boolean) => {
    const newEvents: Record<string, Wcj.Event> = { ...events };

    const eventIds = categories[categoryId].events;

    for (const eventId of eventIds) {
      newEvents[eventId].showInCalendar = show;
    }

    setEvents?.(newEvents);
  };

  return (
    <div className="bg-wcj-sand">
      <EventGroupHeader
        title={categoryId}
        expanded={expanded}
        checked={globalCheckState}
        toggleExpanded={() => setExpanded(!expanded)}
        toggleChecked={() => setAllChecked(globalCheckState !== "all")}
      />

      <div
        className={
          "bg-wcj-sand overflow-hidden " + (expanded ? "max-h-full" : "max-h-0")
        }
      >
        {catEvents.map((event) => (
          <EventItem event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
}
