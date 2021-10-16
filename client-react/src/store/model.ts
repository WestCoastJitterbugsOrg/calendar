export default interface EventStore {
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
  showModal?: string;
}

interface CategoryStore {
  id: string;
  events: string[];
}
