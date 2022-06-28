import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";
import { LinkButton } from "../Buttons/LinkButton";
import { EventInfoTable } from "../EventInfoTable/EventInfoTable";

interface Props {
  eventId: string;
}

export function EventSeriesModalContent(props: Props) {
  const { events, setEventModal } = useContext(StateContext);
  const event = events[props.eventId];

  return (
    <div className="md:min-w-[700px]" data-testid="event-series-modal-content">
      <div
        className="absolute right-5 top-5 cursor-pointer"
        onClick={() => setEventModal?.(false)}
        data-testid="modal-close-button"
      >
        ✖
      </div>
      <h4 className="mt-0">{event.title}</h4>
      {event.description?.includes("<p>") ? (
        <div dangerouslySetInnerHTML={{ __html: event.description }} />
      ) : (
        <p>{event.description}</p>
      )}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
        <div>
          <EventInfoTable event={event}></EventInfoTable>
        </div>
        <div className="ml-auto">
          <LinkButton href={event.registrationUrl} size="lg">
            Registration
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
