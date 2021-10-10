import React from "react";
import { StateContext } from "../App";
import { useSelectors } from "../store/hooks";
import { EventActionTypes } from "../store/reducers";
import { Wcj } from "../types";
import { GroupCheckbox } from "./EventCheckbox";
import EventRow from "./EventRow";

interface EventGroupProps {
  category: string;
}

export default function EventGroup({ category: categoryId }: EventGroupProps) {
  const [expanded, setExpanded] = React.useState(false);
  const { state, dispatch } = React.useContext(StateContext);

  const { events, category, globalCheckState } = useSelectors(
    [state],
    (state) => {
      const category = state.categories.byId[categoryId];
      const events = category.events.reduce(
        (events, eventId) => [...events, state.events.byId[eventId]],
        [] as Wcj.Event[]
      );

      const eventsShown = events.filter((event) => event.showInCalendar).length;
      const globalCheckState =
        eventsShown === 0
          ? "none" as const
          : eventsShown === events.length
          ? "all" as const
          : "some" as const;

      return {
        category,
        events,
        globalCheckState,
      };
    }
  );

  if (category == null) {
    throw Error(`Category ${categoryId} does not exist in state`);
  }

  const setAllChecked = (show: boolean) => {
    dispatch({
      type: EventActionTypes.categoryToggled,
      payload: { id: categoryId, show },
    });
  };

  return (
    <div className="bg-wcj-sand">
      <EventGroupHeader
        title={categoryId}
        expanded={expanded}
        checked={globalCheckState}
        toggleExpanded={() => setExpanded(!expanded)}
        toggleChecked={() => setAllChecked(globalCheckState !== "all")}
      />

      <div
        className={"bg-wcj-sand overflow-hidden " + (expanded ? "max-h-full" : "max-h-0")}
      >
        {events.map((event, i) => (
          <EventRow
            event={event}
            toggle={() =>
              dispatch({
                type: EventActionTypes.eventToggled,
                payload: { id: event.id },
              })
            }
            checked={!!event.showInCalendar}
            key={event.id}
          />
        ))}
      </div>
    </div>
  );
}

interface EventGroupHeaderProps {
  title: string;
  expanded: boolean;
  checked: "all" | "some" | "none";
  toggleExpanded: () => void;
  toggleChecked: () => void;
}

function EventGroupHeader({
  title,
  expanded,
  checked,
  toggleExpanded,
  toggleChecked,
}: EventGroupHeaderProps) {
  return (
    <div className="bg-wcj-cyan text-white font-bold min-h-8 py-2 flex flex-row items-center">
      <div
        className="cursor-pointer flex-grow flex items-center"
        onClick={toggleExpanded}
      >
        <ExpandIcon open={expanded} />
        {title}
      </div>

      <div className="mx-3">
        <GroupCheckbox state={checked} onClick={toggleChecked} />
      </div>
    </div>
  );
}

interface ExpandIconProps {
  open: boolean;
}
function ExpandIcon({ open }: ExpandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={
        "w-4 h-4 mx-2 transition duration-200 transform " +
        (open ? "rotate-45" : "")
      }
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="square" strokeWidth="4" d="M12 4v16m8-8H4" />
    </svg>
  );
}
