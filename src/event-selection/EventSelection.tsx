import { Button } from "@app/shared/Buttons/Button";
import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";
import { EventGroup } from "./EventGroup";

export function EventSelection() {
  const { categories } = useContext(StateContext);
  const { setEvents } = useContext(StateContext) ?? {};

  const select = (show: boolean) =>
    setEvents?.((events) => {
      const newEvents: Record<string, Wcj.Event> = {};

      for (const eventId in events) {
        newEvents[eventId] = {
          ...events[eventId],
          showInCalendar: show,
        };
      }

      return newEvents;
    });
  return (
    <>
      <div className="flex h-16 flex-shrink-0 flex-row items-center justify-center space-x-4 bg-dark">
        <Button onClick={() => select(true)}>Select all</Button>
        <Button onClick={() => select(false)}>Deselect all</Button>
      </div>
      <div
        className="w-full flex-grow divide-y divide-secondary-alt overflow-auto bg-light"
        data-testid="event-selection-groups"
        role="list"
      >
        {Object.keys(categories).map((categoryId) => (
          <EventGroup key={categoryId} category={categoryId} />
        ))}
      </div>
    </>
  );
}
