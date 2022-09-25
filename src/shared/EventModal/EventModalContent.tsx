import closeIcon from "@app/assets/close.svg";
import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";

interface Props {
  eventId: string;
}

export function EventSeriesModalContent(props: Props) {
  const { events, setEventModal } = useContext(StateContext);
  const event = events[props.eventId];

  return (
    <div
      className="h-full w-[min(900px,100dvw)]"
      data-testid="event-series-modal-content"
    >
      <div
        className="absolute right-5 top-5 cursor-pointer"
        onClick={() => setEventModal?.(undefined)}
        data-testid="modal-close-button"
      >
        <img src={closeIcon} width="16" height="16" />
      </div>
      <iframe
        className="h-full w-full overflow-hidden border-none outline-none"
        src={event.registrationUrl + "&layout=calendar"}
        title={event.title}
      ></iframe>
    </div>
  );
}
