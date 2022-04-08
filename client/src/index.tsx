import style from "./styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export const appContainer = document.createElement("div");

try {
  const wcjCalElement = document.getElementById("wcjcal");

  if (wcjCalElement == null) {
    throw Error("Could not find #wcjcal element in DOM");
  } else {
    const shadowRoot = wcjCalElement.attachShadow({ mode: "open" });
    appContainer.id = "wcjcal-shadow-root";

    const styleTag = document.createElement("style");
    styleTag.innerHTML = style.toString();

    const appTag = document.createElement("div");

    appContainer?.appendChild(styleTag);
    appContainer?.appendChild(appTag);
    shadowRoot.appendChild(appContainer);

    const root = createRoot(appTag);

    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    if (process.env.NODE_ENV === "development") {
      console.log("reporting web vitals");
      reportWebVitals(console.log);
    }
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
