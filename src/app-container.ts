const appContainer = document.createElement("div");
appContainer.id = "wcjcal-shadow-root";

const appTag = document.createElement("div");
appContainer?.appendChild(appTag);

void import("./styles/index.css").then((style) => {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = style.default.join("\n");
  appContainer.appendChild(styleTag);
});

export { appContainer, appTag };
