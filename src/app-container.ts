import style from "./styles/index.css";

const appContainer = document.createElement("div");
appContainer.id = "wcjcal-shadow-root";

const styleTag = document.createElement("style");
styleTag.innerHTML = style.toString();

const appTag = document.createElement("div");

appContainer?.appendChild(styleTag);
appContainer?.appendChild(appTag);

export { appContainer, appTag };
