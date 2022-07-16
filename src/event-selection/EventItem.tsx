import checked from "@app/assets/checkmark.svg";
import infoCircle from "@app/assets/info-circle.svg";
import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";

interface Props {
  event: Wcj.Event;
}

export function EventItem(props: Props) {
  const { events, setEvents, setEventModal } = useContext(StateContext);

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
    <div className="m-2 flex min-h-[32px] items-center" role="listitem">
      <img
        data-testid="info-button"
        src={infoCircle}
        className="mr-2 block h-4 w-4 flex-none cursor-pointer text-black opacity-50 hover:opacity-100"
        onClick={() => setEventModal?.(props.event.id)}
      />
      <div
        data-testid="event-item"
        className="flex flex-grow items-center"
        onClick={toggle}
      >
        <span className="flex-grow cursor-pointer pr-2 leading-tight">
          {props.event.title}
        </span>
        <span
          role="checkbox"
          data-testid="event-checkbox"
          aria-readonly
          aria-checked={props.event.showInCalendar}
          className="cursor-pointer"
        >
          {props.event.showInCalendar && <img src={checked} />}
        </span>
      </div>
    </div>
  );
}
