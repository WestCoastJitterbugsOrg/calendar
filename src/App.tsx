import Calendar from "./calendar";
import { ToggleAllButtons } from "./event-selection";
import EventList from "./event-selection/EventList";
import getCogworData from "./services/cogwork";
import { EventSeriesModal, SpinLoader } from "./shared";
import { EventStore } from "./store";
import StateWrapper from "./store/StateWrapper";

const data = getCogworData();
const categories = data.reduce<EventStore["categories"]>(
  (prev, curr) => ({
    byId: {
      ...prev.byId,
      [curr.category]: {
        id: curr.category,
        events: curr.events.map((x) => x.id),
      },
    },
    allIds: [...prev.allIds, curr.category],
  }),
  { byId: {}, allIds: [] }
);
const events = data
  .flatMap((cat) => cat.events)
  .reduce<EventStore["events"]>(
    (prev, curr) => ({
      byId: {
        ...prev.byId,
        [curr.id]: curr,
      },
      allIds: [...prev.allIds, curr.id],
    }),
    { byId: {}, allIds: [] }
  );

const initialContext = {
  categories: categories,
  events: events,
  eventModal: false as const,
};

export default function App() {
  if (!initialContext) return <SpinLoader />;

  return (
    <StateWrapper initialContext={initialContext}>
      <div className="flex flex-row flex-wrap items-stretch bg-white">
        <div className="flex flex-col flex-grow w-96 max-h-[calc(100vh-2rem)]">
          <div className="flex-none">
            <ToggleAllButtons />
          </div>
          <div
            className="flex-grow w-full overflow-auto bg-wcj-sand divide-y divide-wcj-mint"
            data-testid="event-selection-groups"
          >
            <EventList />
          </div>
        </div>
        <div
          className="flex-grow flex-shrink-0 min-h-[calc(100vh-2rem)] min-w-[calc(100%-24rem)]"
          data-testid="calendar-wrapper"
        >
          <Calendar />
        </div>
      </div>
      <EventSeriesModal />
    </StateWrapper>
  );
}
