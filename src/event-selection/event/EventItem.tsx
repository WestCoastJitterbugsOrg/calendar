import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";
import EventCheckbox from "./EventCheckbox";
import { InfoButton } from "./InfoButton";

interface EventRowProps {
  event: Wcj.Event;
}

export default function EventItem({ event }: EventRowProps) {
  const { events, setEvents, setEventModal } = useContext(StateContext);

  const toggle = () => {
    const newEvents: Record<string, Wcj.Event> = {
      ...events,
      [event.id]: {
        ...events[event.id],
        showInCalendar: !events[event.id].showInCalendar,
      },
    };

    setEvents?.(newEvents);
  };

  return (
    <div
      data-testid="event-item"
      className="flex flex-row items-center px-2 my-2 min-h-[32px]"
      onClick={() => toggle()}
    >
      <div
        className="h-4 w-4 mr-2 flex-none"
        onClick={() => setEventModal?.(event.id)}
      >
        <InfoButton />
      </div>
      <div className="flex-grow cursor-pointer pr-2 leading-tight">
        {event.title}
      </div>
      <div className="flex flex-none cursor-pointer">
        <EventCheckbox color="wcj-red" checked={!!event.showInCalendar} />
      </div>
    </div>
  );
}
