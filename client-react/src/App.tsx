import "tailwindcss/tailwind.css";
import React, { ReactChild, useMemo, useReducer, useState } from "react";
import { EventContainer } from "./event-selection";
import { Calendar } from "./calendar";
import EventGroup from "./event-selection/EventGroup";
import { EventActions, EventActionTypes, eventReducer } from "./store/reducers";
import { SpinLoader } from "./event-selection/Spinner";
import { loadCogworkData } from "./services";
import { EventStore } from "./store/model";

const initialContext = {
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
    "loading" as "loading" | "loaded" | "error"
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
    } catch {
      setLoadState("error");
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <StateContext.Provider value={{ state, dispatch }}>
        <div className="max-h-screen overflow-y-hidden lg:w-96 flex flex-col">
          {loadState === "loaded" ? (
            <EventContainer>
              {state.categories.allIds.map<ReactChild>((categoryId) => (
                <EventGroup key={categoryId} category={categoryId} />
              ))}
            </EventContainer>
          ) : (
            <SpinLoader />
          )}
        </div>
        <div className="flex-grow">
          <Calendar />
        </div>
      </StateContext.Provider>
    </div>
  );
}
