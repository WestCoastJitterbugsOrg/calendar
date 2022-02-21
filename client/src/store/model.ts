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
  // If string, show modal with event matching that id. If false, don't show modal
  eventModal: string | false;
}

interface CategoryStore {
  id: string;
  events: string[];
}
