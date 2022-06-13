import Calendar from "./calendar";
import EventSelection from "./event-selection/EventSelection";
import initContext from "./services/cogwork";
import { EventSeriesModal } from "./shared";
import StateWrapper from "./store/StateWrapper";

export default function App() {
  return (
    <div className="flex flex-row flex-wrap items-stretch bg-white min-h-[calc(100vh-32px)]">
      <StateWrapper initialContext={initContext()}>
        <div className="flex flex-col flex-grow w-96 max-h-[calc(100vh-32px)]">
          <EventSelection />
        </div>
        <div
          className="flex-grow flex-shrink-0 min-h-[calc(100vh-32px)] min-w-[calc(100%-384px)]"
          data-testid="calendar-wrapper"
        >
          <Calendar />
        </div>
        <EventSeriesModal />
      </StateWrapper>
    </div>
  );
}
