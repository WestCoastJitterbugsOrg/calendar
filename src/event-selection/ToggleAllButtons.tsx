import { Button } from "@app/shared";
import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";

export default function ToggleAllButtons() {
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
    <div className="bg-wcj-black flex flex-row h-16 justify-center items-center space-x-4 font-xs">
      <Button title="Select all" size="md" onClick={() => select(true)} />
      <Button title="Deselect all" size="md" onClick={() => select(false)} />
    </div>
  );
}
