import { Calendar } from "./calendar/Calendar";
import { ErrorViewer } from "./ErrorViewer";
import { EventSelection } from "./event-selection/EventSelection";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { initContext } from "./services/cogwork";
import { EventSeriesModal } from "./shared/EventModal/EventSeriesModal";
import { StateWrapper } from "./store/StateWrapper";

export default function App() {
  try {
    const { categories, events } = initContext();
    return (
      <>
        <Header />
        <StateWrapper categories={categories} events={events}>
          <div className="min-h-[calc(100vh-128px)]">
            <div className="flex flex-row flex-wrap items-stretch bg-white">
              <div className="flex max-h-[calc(100vh-128px)] w-96 flex-grow flex-col">
                <EventSelection />
              </div>
              <div
                className="min-h-[calc(100vh-128px)] min-w-[calc(100%-384px)] flex-shrink-0 flex-grow"
                data-testid="calendar-wrapper"
              >
                <Calendar />
              </div>
            </div>
            <Footer />
          </div>
          <EventSeriesModal />
        </StateWrapper>
      </>
    );
  } catch (err) {
    return <ErrorViewer message={err}></ErrorViewer>;
  }
}
