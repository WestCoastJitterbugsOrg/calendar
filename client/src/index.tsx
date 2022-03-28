import "@app/index.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

try {
  const wcjCalElement = document.getElementById("wcjcal");

  if (wcjCalElement == null) {
    throw Error("Could not find #wcjcal element in DOM");
  } else {
    ReactDOM.render(
      <StrictMode>
        <App />
      </StrictMode>,
      wcjCalElement
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
