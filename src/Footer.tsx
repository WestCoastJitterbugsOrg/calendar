import { useContext } from "react";
import fileDownload from "./assets/file-download.svg";
import githubLogo from "./assets/github-logo.png";
import { exportICS } from "./services/ics";
import { Button } from "./shared/Buttons/Button";
import { StateContext } from "./store/StateWrapper";

export function Footer() {
  const { events } = useContext(StateContext);

  return (
    <footer className="flex flex-wrap items-center justify-between bg-dark p-2">
      <div className="flex-grow" data-testid="download-ics-button">
        <Button onClick={() => exportICS(events)}>
          Download <img src={fileDownload} className="h-4 w-4" />
        </Button>
      </div>
      <a
        className="flex flex-grow-0 items-center no-underline"
        href="https://github.com/WestCoastJitterbugsOrg/Personalized-Calendar"
      >
        <span className="max-w-[120px] text-right text-xs font-bold text-white">
          Help with development or report an issue
        </span>
        <img src={githubLogo} className="px-2"></img>
      </a>
    </footer>
  );
}
