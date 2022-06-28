import { Button } from "@app/shared/Buttons/Button";
import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";

export function ToggleAllButtons() {
  const { events, setEvents } = useContext(StateContext) ?? {};

  const select = (show: boolean) => {
    const newEvents: Record<string, Wcj.Event> = {};

    for (const eventId of Object.keys(events)) {
      newEvents[eventId] = {
        ...events[eventId],
        showInCalendar: show,
      };
    }

    setEvents?.(newEvents);
  };

  return (
    <div className="font-xs flex h-16 flex-row items-center justify-center space-x-4 bg-dark">
      <Button onClick={() => select(true)}>Select all</Button>
      <Button onClick={() => select(false)}>Deselect all</Button>
    </div>
  );
}
