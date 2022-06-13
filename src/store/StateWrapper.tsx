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
    // Due to EU law, we need to check that user has consented to storing functional information
    // There are two cookies that we check to see if the user has consented
    const canStore = document.cookie
      .split(";")
      .map((x) => x.split("="))
      .find(
        (x) =>
          x[0] === "cookielawinfo-checkbox-functional" ||
          x[0] === "wcjcal-accept-storing"
      )?.[1];

    if (canStore === "yes") {
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
