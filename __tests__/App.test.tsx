import "@testing-library/jest-dom";
import { render as libRender, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../src/App";
import loadCogworkData from "../src/services/cogwork";

jest.mock("../src/services/cogwork");

const mockLoadCogworkData = loadCogworkData as jest.MockedFunction<
  typeof loadCogworkData
>;

const mockEvents = [
  {
    category: "Lindy Hop",
    events: [
      {
        color: "",
        id: "1",
        instructors: "",
        occasions: [
          {
            start: new Date("2022-01-01 18:00"),
            end: new Date("2022-01-01 20:00"),
          },
        ],
        place: "Forum",
        price: "1337",
        registrationUrl: "https://example.com/registration",
        title: "Grundkurs Lindy Hop",
      },
    ],
  },
];

function render(ui: ReactElement) {
  if (container != null) {
    return libRender(ui, { container });
  } else {
    throw "Container not initialized";
  }
}

function getEventGroupInputs(
  renderResult: RenderResult,
  groupSelector = (collection: HTMLCollection) => collection[0]
) {
  const eventGroup = groupSelector(
    renderResult.getByTestId("event-selection-groups").children
  ).children;

  const group = eventGroup[0];
  const eventsWrapper = eventGroup[1];

  const groupInput = group.querySelector("input");
  const eventInputs = Array.from(
    eventsWrapper.children[0].querySelectorAll("input")
  );

  return [groupInput, eventInputs] as const;
}

let container: HTMLDivElement | null = null;
beforeEach(() => {
  container = document.createElement("div");
  container.id = "wcjcal";
  document.body.appendChild(container);
});

afterEach(() => {
  if (container != null) {
    unmountComponentAtNode(container);
    container.remove();
  }
  container = null;
});

it("Snapshot", async () => {
  mockLoadCogworkData.mockReturnValue(mockEvents);
  render(<App />);
  expect(container?.innerHTML).toMatchSnapshot();
});

it("Events are selected at start", async () => {
  mockLoadCogworkData.mockReturnValue(mockEvents);
  const renderResult = render(<App />);

  const [groupInput, eventInputs] = getEventGroupInputs(renderResult);
  expect(groupInput).toBeChecked();
  eventInputs.forEach((eventInput) => expect(eventInput).toBeChecked());
});

it("Clicking deselect all deselects all events and groups", async () => {
  mockLoadCogworkData.mockReturnValue(mockEvents);
  const renderResult = render(<App />);
  const deselectAllBtn = await renderResult.findByText("Deselect all");

  act(() => {
    deselectAllBtn.click();
  });

  const [groupInput, eventInputs] = getEventGroupInputs(renderResult);
  expect(groupInput).not.toBeChecked();
  eventInputs.forEach((eventInput) => expect(eventInput).not.toBeChecked());
});
