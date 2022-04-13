import Calendar from "./calendar";
import { EventGroup, ToggleAllButtons } from "./event-selection";
import loadCogworkData from "./services/cogwork";
import { EventSeriesModal, SpinLoader } from "./shared";
import eventReducer, {
  EventActions,
  EventStore,
} from "./store";
import { createContext, useEffect, useReducer, useState } from "react";

const initialContext: EventStore = {
  categories: { byId: {}, allIds: [] },
  events: { byId: {}, allIds: [] },
  eventModal: false,
};

interface StateContext {
  state: EventStore;
  dispatch: React.Dispatch<EventActions>;
}

export const StateContext = createContext<StateContext>({
  state: initialContext,
  dispatch: () => null,
});

type LoadState = "loading" | "loaded" | { error: unknown };

export default function App() {
  const [loadState, setLoadState] = useState<LoadState>("loading");

  const [state, dispatch] = useReducer(eventReducer, initialContext);

  useEffect(() => {
    const data = loadCogworkData();
    setLoadState("loaded");
    dispatch({ type: "eventsLoaded", payload: data });
  }, []);

  switch (loadState) {
    case "loading": {
      return <SpinLoader />;
    }
    case "loaded": {
      return (
        <StateContext.Provider value={{ state, dispatch }}>
          <div className="flex flex-row flex-wrap items-stretch bg-white">
            <div className="flex flex-col flex-grow w-96 max-h-[calc(100vh-2rem)]">
              <div className="flex-none">
                <ToggleAllButtons />
              </div>
              <div className="flex-grow w-full overflow-auto bg-wcj-sand divide-y divide-wcj-mint">
                {state.categories.allIds.map((categoryId) => (
                  <EventGroup key={categoryId} category={categoryId} />
                ))}
              </div>
            </div>
            <div
              className="flex-grow flex-shrink-0 min-h-[calc(100vh-2rem)] min-w-[calc(100%-24rem)]"
              style={{ minWidth: "calc(100%-24rem)" }}
            >
              <Calendar />
            </div>
          </div>
          <EventSeriesModal />
        </StateContext.Provider>
      );
    }
    default: {
      const error = getError(loadState.error);
      // Error message sent from server
      return (
        <div className="container m-auto my-8">
          <h1 className="text-2xl font-bold underline text-wcj-red">
            Error while loading data!
          </h1>
          <p className="font-bold">Got the following from server:</p>
          <pre className="font-mono">{error}</pre>
        </div>
      );
    }
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
