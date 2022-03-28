import { EventInfoTable, LinkButton } from "@app/shared";

export function EventSeriesModalContent({
  event,
  onCloseClick,
}: {
  event: Wcj.Event;
  onCloseClick: () => void;
}) {
  return (
    <div className="md:min-w-[700px]">
      <div
        className="absolute right-5 top-5 cursor-pointer"
        onClick={onCloseClick}
      >
        ✖
      </div>
      <h4 className="mt-0">{event.title}</h4>
      {event.description?.includes("<p>") ? (
        <div dangerouslySetInnerHTML={{ __html: event.description }} />
      ) : (
        <p>{event.description}</p>
      )}
      <div className="flex flex-wrap justify-around gap-4 items-end mt-4">
        <div className="bg-wcj-mint p-4 rounded-md">
          <EventInfoTable event={event}></EventInfoTable>
        </div>
        <div>
          <LinkButton href={event.registrationUrl} size="lg">
            Registration
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
