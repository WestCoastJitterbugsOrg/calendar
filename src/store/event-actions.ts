import { EventPayload } from "./payloads";

type EventActionTypes =
  | "allToggled"
  | "categoryToggled"
  | "eventToggled"
  | "eventModalRequested"
  | "modalClosed";

type ActionMap<M extends Record<EventActionTypes, unknown>> = {
  [key in keyof M]: M[key] extends undefined
    ? { type: key }
    : { type: key; payload: M[key] };
};

type EventActionMap = ActionMap<EventPayload>;
export type EventActions = EventActionMap[keyof EventActionMap];
