import githublogo from "./assets/github-logo.png";
import Button from "./shared/Buttons/Button";
import { useContext } from "react";
import { StateContext } from "./store/StateWrapper";
import ics from "./services/ics";

export function Footer() {
  const { events } = useContext(StateContext);

  const exportICS = () => {
    const selectedEvents = Object.values(events).filter(
      (event) => event.showInCalendar
    );
    const icsStr = ics(selectedEvents);

    const file = new Blob([icsStr], { type: "text/calendar" });
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wcj-events.ics";
    document.body.appendChild(a);
    a.click();
    return setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="flex min-h-[16px] flex-wrap items-center justify-between bg-black p-2">
      <div className="flex-grow" data-testid="download-ics-button">
        <Button size="sm" onClick={exportICS}>
          <>
            Download
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </>
        </Button>
      </div>
      <a
        className="flex flex-grow-0 items-center no-underline"
        href="https://github.com/WestCoastJitterbugsOrg/Personalized-Calendar"
      >
        <span className="max-w-[90px] text-right text-xs font-bold text-white">
          Contribute to this project
        </span>
        <img src={githublogo} className="px-2"></img>
      </a>
    </div>
  );
}
