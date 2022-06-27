import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";
import EventCheckbox from "./EventCheckbox";
import { InfoButton } from "./InfoButton";

interface Props {
  event: Wcj.Event;
}

export default function EventItem(props: Props) {
  const { events, setEvents } = useContext(StateContext);

  const toggle = () => {
    const newEvents = {
      ...events,
      [props.event.id]: {
        ...events[props.event.id],
        showInCalendar: !events[props.event.id].showInCalendar,
      },
    };

    setEvents?.(newEvents);
  };

  return (
    <div className="m-2 flex min-h-[32px] items-center">
      <InfoButton eventId={props.event.id} />
      <div
        data-testid="event-item"
        className="flex flex-grow items-center"
        onClick={() => toggle()}
      >
        <div className="flex-grow cursor-pointer pr-2 leading-tight">
          {props.event.title}
        </div>
        <EventCheckbox checked={props.event.showInCalendar} />
      </div>
    </div>
  );
}
