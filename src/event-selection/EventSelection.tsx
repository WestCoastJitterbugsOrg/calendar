import EventList from "./EventList";
import ToggleAllButtons from "./ToggleAllButtons";

export default function EventSelection() {
  return (
    <>
      <div className="flex-none">
        <ToggleAllButtons />
      </div>
      <div
        className="flex-grow w-full overflow-auto bg-wcj-sand divide-y divide-wcj-mint"
        data-testid="event-selection-groups"
      >
        <EventList />
      </div>
    </>
  );
}
