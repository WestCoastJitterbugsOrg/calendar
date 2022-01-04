import React, { ReactChild, useMemo, useReducer, useState } from "react";
import Calendar from "./calendar/Calendar";
import EventGroup from "./event-selection/EventGroup";
import ToggleAllButtons from "./event-selection/ToggleAllButtons";
import loadCogworkData from "./services/cogwork";
import SpinLoader from "./shared/Spinner";
import EventStore from "./store/model";
import eventReducer, { EventActions, EventActionTypes } from "./store/reducers";

const initialContext: EventStore = {
  categories: { byId: {}, allIds: [] },
  events: { byId: {}, allIds: [] },
};

export const StateContext = React.createContext<{
  state: EventStore;
  dispatch: React.Dispatch<EventActions>;
}>({
  state: initialContext,
  dispatch: () => null,
});

export default function App() {
  const [loadState, setLoadState] = useState(
    "loading" as "loading" | "loaded" | string
  );

  const [state, dispatch] = useReducer(eventReducer, initialContext);

  useMemo(async () => {
    try {
      const data = await loadCogworkData();
      setLoadState("loaded");
      dispatch({
        type: EventActionTypes.eventsLoaded,
        payload: data,
      });
    } catch (e) {
      if (e instanceof Promise) {
        e.then((val) => {
          console.log(val);
          setLoadState(val);
        });
      } else {
        setLoadState(`${e}`);
      }
    }
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
                {state.categories.allIds.map<ReactChild>((categoryId) => (
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
        </StateContext.Provider>
      );
    }
    default: {
      let error;
      try {
        error = JSON.stringify(JSON.parse(loadState), null, 4);
      } catch {
        error = loadState.toString();
      }
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
