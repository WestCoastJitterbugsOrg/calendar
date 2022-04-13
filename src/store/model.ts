export default interface EventStore {
  categories: {
    byId: Record<string, CategoryStore>;
    allIds: string[];
  };
  events: {
    byId: Record<string, Wcj.Event>;
    allIds: string[];
  };
  // If string, show modal with event matching that id. If false, don't show modal
  eventModal: string | false;
}

interface CategoryStore {
  id: string;
  events: string[];
}
