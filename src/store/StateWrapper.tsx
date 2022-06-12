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
  children: JSX.Element[] | JSX.Element;
  initialContext: EventStore;
}

export default function StateWrapper(props: Props) {
  try {
    const [state, dispatch] = useReducer(eventReducer, props.initialContext);

    return (
      <StateContext.Provider value={{ state, dispatch }}>
        {props.children}
      </StateContext.Provider>
    );
  } catch (err) {
    const error = getError(err);
    // Error message sent from server
    return (
      <div className="container m-auto my-8">
        <h1 className="text-2xl font-bold underline text-wcj-red">
          Error while loading data!
        </h1>
        <p className="font-bold">Got the following error:</p>
        <pre className="font-mono">{error}</pre>
      </div>
    );
  }
}

function getError(error: unknown): string | undefined {
  switch (typeof error) {
    case "boolean":
    case "number":
    case "bigint":
    case "string":
    case "symbol":
    case "undefined":
      return getToStringableError(error);
    case "object":
      return JSON.stringify(error, null, 4);
    case "function":
      return getError(error());
    default:
      return;
  }
}

function getToStringableError(
  error: boolean | number | bigint | string | symbol | undefined
): string {
  try {
    return JSON.stringify(JSON.parse(error?.toString?.() ?? ""), null, 4);
  } catch {
    return error?.toString?.() ?? "Unknown error";
  }
}
