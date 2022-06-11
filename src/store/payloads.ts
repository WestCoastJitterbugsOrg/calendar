export interface AllToggledPayload {
  show: boolean;
}
export interface EventToggledPayload {
  id: string;
}
export interface CategoryToggledPayload {
  id: string;
  show: boolean;
}

export interface EventPayload {
  allToggled: AllToggledPayload;
  categoryToggled: CategoryToggledPayload;
  eventToggled: EventToggledPayload;
  eventModalRequested: string;
  modalClosed: undefined;
}
