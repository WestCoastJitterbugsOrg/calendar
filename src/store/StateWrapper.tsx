import { canStoreSelection } from "@app/services/cookies";
import { createContext, useEffect, useState } from "react";
import StateContext, { CategoryStore } from "./model";

export const StateContext = createContext<StateContext>({
  categories: {},
  events: {},
  eventModal: false,
});

export type CategoryMap = Readonly<Record<string, CategoryStore>>;
export type EventMap = Readonly<Record<string, Readonly<Wcj.Event>>>;

interface Props {
  children: JSX.Element[] | JSX.Element;
  categories: CategoryMap;
  events: EventMap;
  eventModal?: string;
}

export default function StateWrapper(props: Props) {
  const [categories, setCategories] = useState<Record<string, CategoryStore>>(
    props.categories
  );
  const [events, setEvents] = useState<EventMap>(props.events);
  const [eventModal, setEventModal] = useState<string | false>(
    props.eventModal ?? false
  );

  useEffect(() => {
    if (canStoreSelection()) {
      const uncheckedEvents = Object.values(events)
        .filter((x) => !x.showInCalendar)
        .map((x) => x.id);

      localStorage.setItem("uncheckedEvents", JSON.stringify(uncheckedEvents));
    }
  }, [events]);

  return (
    <StateContext.Provider
      value={{
        categories,
        setCategories,
        events,
        setEvents,
        eventModal,
        setEventModal,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}
