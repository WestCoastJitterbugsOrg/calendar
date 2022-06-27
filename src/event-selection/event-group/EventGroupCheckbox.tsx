import { CategoryStore } from "@app/store/model";
import { StateContext } from "@app/store/StateWrapper";
import { getCategoryEvents } from "@app/store/utils";
import { useContext, useEffect, useRef } from "react";

interface Props {
  category: CategoryStore;
}

export function GroupCheckbox(props: Props) {
  const { events, setEvents } = useContext(StateContext);

  const catEvents = getCategoryEvents(props.category, events);

  const eventsShown = catEvents.filter((event) => event.showInCalendar).length;
  const globalCheckState =
    eventsShown === 0
      ? ("none" as const)
      : eventsShown === props.category.events.length
      ? ("all" as const)
      : ("some" as const);

  const setAllChecked = (show: boolean) => {
    const newEvents: Record<string, Wcj.Event> = { ...events };

    for (const eventId of props.category.events) {
      newEvents[eventId].showInCalendar = show;
    }

    setEvents?.(newEvents);
  };

  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = globalCheckState === "some";
    }
  }, [globalCheckState]);

  return (
    <label className="w-[22px]">
      <input
        ref={checkboxRef}
        type="checkbox"
        data-testid="group-checkbox"
        className={`
        checkbox

        m-0 h-5 w-5 rounded-md border-[2px]
        border-solid border-dark bg-light
        
        checked:after:left-[6px] checked:after:-top-[5px] 
        checked:after:h-4 checked:after:w-2 
        checked:after:rotate-[50deg] checked:after:rounded-br-[3px]
        checked:after:border-0 checked:after:border-b-[3px] 
        checked:after:border-r-[3px] checked:after:border-solid checked:after:border-dark
        
        indeterminate:after:top-[6px] indeterminate:after:left-[2px] indeterminate:after:h-1 indeterminate:after:w-3 
        indeterminate:after:rotate-0 indeterminate:after:bg-dark
        `}
        readOnly
        checked={globalCheckState === "all"}
        onClick={(e) => {
          e.stopPropagation();
          setAllChecked(globalCheckState !== "all");
        }}
      />
    </label>
  );
}
