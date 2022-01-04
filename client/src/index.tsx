import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const wcjCalElement = document.getElementById("wcjcal");

if (wcjCalElement == null) {
  alert("Fatal: Could not find #wcjcal element in DOM");
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
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
