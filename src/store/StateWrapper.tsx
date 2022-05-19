import { createContext, Dispatch, useReducer } from "react";
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
  children: JSX.Element[];
  initialContext: EventStore;
}

function StateWrapper(props: Props) {
  const [state, dispatch] = useReducer(eventReducer, props.initialContext);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
}

export default StateWrapper;
