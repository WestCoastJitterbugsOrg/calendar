import EventItem from "../event/EventItem";
import { StateContext } from "@app/store/StateWrapper";
import { useContext, useState } from "react";
import { EventGroupHeader } from "./EventGroupHeader";
import { getCategoryEvents } from "@app/store/utils";

interface Props {
  category: string;
}

export default function EventGroup(props: Props) {
  const [expanded, setExpanded] = useState(false);
  const { categories, events } = useContext(StateContext);

  const category = categories[props.category];
  const catEvents = getCategoryEvents(category, events);

  return (
    <div className="bg-light">
      <EventGroupHeader
        category={category}
        expanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
      />

      <div
        className={`overflow-hidden bg-light ${
          expanded ? "max-h-full" : "max-h-0"
        }`}
      >
        {catEvents.map((event) => (
          <EventItem event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
}
