import Calendar from "./calendar";
import { ToggleAllButtons } from "./event-selection";
import EventList from "./event-selection/EventList";
import initContext from "./services/cogwork";
import { EventSeriesModal } from "./shared";
import StateWrapper from "./store/StateWrapper";



export default function App() {
  return (
    <StateWrapper initialContext={initContext()}>
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
