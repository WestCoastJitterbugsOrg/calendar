import { canStoreSelection } from "@app/services/cookies";
import { createContext, Dispatch, useEffect, useReducer } from "react";
import { EventActions } from "./event-actions";
import EventStore from "./model";
import eventReducer from "./reducers";

export interface StateContext {
  state: EventStore;
  dispatch: Dispatch<EventActions>;
}
const emptyContext: EventStore = {
  categories: { byId: {}, allIds: [] },
  events: { byId: {}, allIds: [] },
  eventModal: false,
};

export const StateContext = createContext<StateContext>({
  state: emptyContext,
  dispatch: () => null,
});

interface Props {
  children: JSX.Element[] | JSX.Element;
  initialContext: EventStore;
}

export default function StateWrapper(props: Props) {
  const [state, dispatch] = useReducer(eventReducer, props.initialContext);

  useEffect(() => {
  
    if (canStoreSelection()) {
      const uncheckedEvents = Object.values(state.events.byId)
        .filter((x) => !x.showInCalendar)
        .map((x) => x.id);

      localStorage.setItem("uncheckedEvents", JSON.stringify(uncheckedEvents));
    }
  }, [state.events]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
}
