import { CategoryStore } from "./model";

export function getCategoryEvents(
  category: CategoryStore,
  allEvents: Record<string, Wcj.Event>
) {
  return category.events.reduce<Wcj.Event[]>(
    (e, id) => [...e, allEvents[id]],
    []
  );
}
