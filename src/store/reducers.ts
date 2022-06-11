import { EventStore } from ".";
import { EventActions } from "./event-actions";
import { CategoryToggledPayload, EventToggledPayload } from "./payloads";

export default function eventReducer(state: EventStore, action: EventActions) {
  switch (action.type) {
    case "allToggled":
      return allToggledReducer(state, action.payload.show);
    case "categoryToggled":
      return categoryToggledReducer(state, action.payload);
    case "eventToggled":
      return eventToggledReducer(state, action.payload);
    case "eventModalRequested":
      return { ...state, eventModal: action.payload };
    case "modalClosed":
      return { ...state, eventModal: false as const };
    default:
      return { ...state };
  }
}

function allToggledReducer(state: EventStore, show: boolean) {
  const newState: EventStore = {
    ...state,
    events: {
      byId: {},
      allIds: state.events.allIds,
    },
  };

  for (const eventId of state.events.allIds) {
    const event = state.events.byId[eventId];
    newState.events.byId[eventId] = {
      ...event,
      showInCalendar: show,
    };
  }

  return newState;
}

function categoryToggledReducer(
  state: EventStore,
  payload: CategoryToggledPayload
) {
  const newState: EventStore = {
    ...state,
    events: {
      ...state.events,
      byId: {
        ...state.events.byId,
      },
    },
  };

  const eventIds = state.categories.byId[payload.id].events;

  for (const eventId of eventIds) {
    newState.events.byId[eventId].showInCalendar = payload.show;
  }

  return newState;
}

function eventToggledReducer(state: EventStore, payload: EventToggledPayload) {
  const newState: EventStore = {
    ...state,
    events: {
      ...state.events,
      byId: {
        ...state.events.byId,
      },
    },
  };

  const event: Wcj.Event = {
    ...state.events.byId[payload.id],
    showInCalendar: !state.events.byId[payload.id].showInCalendar,
  };

  newState.events.byId[payload.id] = event;

  return newState;
}
