import { CategoryStore } from "@app/store/model";
import { StateContext } from "@app/store/StateWrapper";
import { getCategoryEvents } from "@app/store/utils";
import { useContext } from "react";
import checked from "@app/assets/checkbox-checked.svg";
import unchecked from "@app/assets/checkbox-unchecked.svg";
import indeterminate from "@app/assets/checkbox-indeterminate.svg";

interface Props {
  category: CategoryStore;
}

export function GroupCheckbox(props: Props) {
  const { events, setEvents } = useContext(StateContext);

  const catEvents = getCategoryEvents(props.category, events);

  const eventsShown = catEvents.filter((event) => event.showInCalendar).length;
  const [globalCheckState, imgSrc] =
    eventsShown === 0
      ? [false, unchecked]
      : eventsShown === props.category.events.length
      ? [true, checked]
      : ["mixed" as const, indeterminate];

  const setAllChecked = (show: boolean) => {
    const newEvents: Record<string, Wcj.Event> = { ...events };

    for (const eventId of props.category.events) {
      newEvents[eventId].showInCalendar = show;
    }

    setEvents?.(newEvents);
  };

  return (
    <img
      role="checkbox"
      className="bg-white"
      aria-checked={globalCheckState}
      onClick={(e) => {
        e.stopPropagation();
        setAllChecked(globalCheckState !== true);
      }}
      src={imgSrc}
    />
  );
}
