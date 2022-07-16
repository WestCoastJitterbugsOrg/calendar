import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { appContainer, appTag } from "./app-container";
const App = lazy(() => import("./App"));

try {
  const wcjCalElement = document.getElementById("wcjcal");

  if (wcjCalElement == null) {
    throw Error("Could not find #wcjcal element in DOM");
  } else {
    const shadowRoot = wcjCalElement.attachShadow({ mode: "open" });
    shadowRoot.appendChild(appContainer);
    const root = createRoot(appTag);

    root.render(
      <StrictMode>
        <Suspense fallback={<SpinLoader />}>
          <App />
        </Suspense>
      </StrictMode>
    );
  }
} catch (error) {
  console.error(
    `
  An error occured in WCJ Calendar!
  Please contact it@wcj.se with the error message:
  `,
    error
  );
}
function SpinLoader() {
  return (
    <div className="flex h-screen items-center justify-center bg-wcj-sand">
      <div className="h-16 w-16 animate-spin rounded-[50%] border-8 border-solid border-t-wcj-coral border-r-wcj-cyan border-b-wcj-red border-l-wcj-mint"></div>
    </div>
  );
}
