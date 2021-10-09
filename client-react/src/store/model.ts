import { Wcj } from "../types";

export interface EventStore {
    categories: {
      byId: {
        [id: string]: CategoryStore;
      };
      allIds: string[];
    };
    events: {
      byId: {
        [id: string]: Wcj.Event;
      };
      allIds: string[];
    };
  }

  interface CategoryStore {
    id: string;
    events: string[];
  }
  