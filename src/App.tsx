import Calendar from "./calendar";
import EventSelection from "./event-selection/EventSelection";
import { Header } from "./Header";
import initContext from "./services/cogwork";
import { EventSeriesModal } from "./shared";
import StateWrapper from "./store/StateWrapper";

export default function App() {
  try {
    return (
      <>
        <Header />
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
      </>
    );
  } catch (err) {
    const error = getError(err);
    // Error message sent from server
    return (
      <div className="container m-auto my-8">
        <h1 className="text-2xl font-bold underline text-wcj-red">
          Error while loading data!
        </h1>
        <p className="font-bold">Got the following error:</p>
        <pre className="font-mono">{error}</pre>
      </div>
    );
  }
}

function getError(error: unknown): string | undefined {
  switch (typeof error) {
    case "boolean":
    case "number":
    case "bigint":
    case "string":
    case "symbol":
    case "undefined":
      return getToStringableError(error);
    case "object":
      return JSON.stringify(error, null, 4);
    case "function":
      return getError(error());
    default:
      return;
  }
}

function getToStringableError(
  error: boolean | number | bigint | string | symbol | undefined
): string {
  try {
    return JSON.stringify(JSON.parse(error?.toString?.() ?? ""), null, 4);
  } catch {
    return error?.toString?.() ?? "Unknown error";
  }
}
