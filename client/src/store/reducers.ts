import { ActionMap } from "./hooks";
import EventStore from "./model";

type EventActionMap = ActionMap<EventPayload>;

export enum EventActionTypes {
  allToggled = "allToggled",
  categoryToggled = "categoryToggled",
  eventToggled = "eventToggled",
  eventsLoaded = "eventsLoaded",
  eventModalRequested = "eventModalRequested",
  modalClosed = "modalClosed",
}

type EventPayload = {
  [EventActionTypes.allToggled]: { show: boolean };
  [EventActionTypes.categoryToggled]: { id: string; show: boolean };
  [EventActionTypes.eventToggled]: { id: string };
  [EventActionTypes.eventsLoaded]: Wcj.EventCategory[];
  [EventActionTypes.eventModalRequested]: string;
  [EventActionTypes.modalClosed]: undefined;
};

export type EventActions = EventActionMap[keyof EventActionMap];
export type EventReducer = typeof eventReducer;

export default function eventReducer(
  state: EventStore,
  action: EventActions
): EventStore {
  switch (action.type) {
    case EventActionTypes.allToggled:
      return allToggledReducer(state, action.payload.show);
    case EventActionTypes.categoryToggled:
      return categoryToggledReducer(state, action.payload);
    case EventActionTypes.eventToggled:
      return eventToggledReducer(state, action.payload);
    case EventActionTypes.eventsLoaded:
      return eventsLoaded(state, action.payload);
    case EventActionTypes.eventModalRequested:
      return { ...state, eventModal: action.payload };
    case EventActionTypes.modalClosed:
      return { ...state, eventModal: false };

    default:
      return { ...state };
  }
}

function allToggledReducer(state: EventStore, show: boolean): EventStore {
  const events = { ...state.events };
  const newEvents = {} as { [eventId: string]: Wcj.Event };

  for (const eventId of events.allIds) {
    const event = events.byId[eventId];
    newEvents[eventId] = {
      ...event,
      showInCalendar: show,
    };
  }

  return {
    ...state,
    events: {
      ...state.events,
      byId: newEvents,
    },
  };
}

function eventsLoaded(
  state: EventStore,
  payload: EventActionMap[EventActionTypes.eventsLoaded]["payload"]
): EventStore {
  const newState: EventStore = {
    ...state,
    categories: {
      byId: {},
      allIds: [],
    },
    events: {
      byId: {},
      allIds: [],
    },
  };

  for (const category of payload) {
    newState.categories.byId[category.category] = {
      id: category.category,
      events: category.events.map((event) => event.id),
    };
    newState.categories.allIds.push(category.category);
    for (const event of category.events) {
      newState.events.byId[event.id] = { ...event, showInCalendar: true };
      newState.events.allIds.push(event.id);
    }
  }

  return newState;
}

function categoryToggledReducer(
  state: EventStore,
  payload: EventActionMap[EventActionTypes.categoryToggled]["payload"]
): EventStore {
  const eventIds = state.categories.byId[payload.id].events;

  const eventsById = { ...state.events.byId };

  for (const eventId of eventIds) {
    eventsById[eventId].showInCalendar = payload.show;
  }

  return {
    ...state,
    events: {
      ...state.events,
      byId: eventsById,
    },
  };
}

function eventToggledReducer(
  state: EventStore,
  payload: EventActionMap[EventActionTypes.eventToggled]["payload"]
): EventStore {
  const newCheckState = !state.events.byId[payload.id].showInCalendar;

  const event: Wcj.Event = {
    ...state.events.byId[payload.id],
    showInCalendar: newCheckState,
  };

  const eventsById = {
    ...state.events.byId,
    [payload.id]: event,
  };

  return {
    ...state,
    events: {
      ...state.events,
      byId: eventsById,
    },
  };
}
