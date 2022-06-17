import { Dispatch, SetStateAction } from "react";

export interface EventStore {
  categories: Record<string, CategoryStore>;
  events: Record<string, Wcj.Event>;
  // If string, show modal with event matching that id. If false, don't show modal
  eventModal: string | false;
}

export default interface StateContext extends EventStore {
  setCategories?: Dispatch<SetStateAction<Record<string, CategoryStore>>>;
  setEvents?: Dispatch<SetStateAction<Record<string, Wcj.Event>>>;
  setEventModal?: Dispatch<SetStateAction<string | false>>;
}

export interface CategoryStore {
  id: string;
  events: string[];
}
