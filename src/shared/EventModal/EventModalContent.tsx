import { LinkButton } from "../Buttons/LinkButton";
import EventInfoTable from "../EventInfoTable";

interface props {
  event: Wcj.Event;
  onCloseClick: () => void;
}

export function EventSeriesModalContent({ event, onCloseClick }: props) {
  return (
    <div className="md:min-w-[700px]">
      <div
        className="absolute right-5 top-5 cursor-pointer"
        onClick={onCloseClick}
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
          <EventInfoTable {...event}></EventInfoTable>
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
