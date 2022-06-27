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
    <div className="m-2 flex min-h-[32px] items-center">
      <InfoButton onClick={() => setEventModal?.(event.id)} />
      <div
        data-testid="event-item"
        className="flex flex-grow items-center"
        onClick={() => toggle()}
      >
        <div className="flex-grow cursor-pointer pr-2 leading-tight">
          {event.title}
        </div>
        <EventCheckbox checked={!!event.showInCalendar} />
      </div>
    </div>
  );
}
