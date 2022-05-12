import Calendar from "@app/calendar";
import { EventGroup } from "@app/event-selection";
import { createPopper } from "@popperjs/core";
import "@testing-library/jest-dom";
import { render as libRender, RenderResult, act } from "@testing-library/react";
import { ReactElement } from "react";
import { unmountComponentAtNode } from "react-dom";
import App, { StateContext } from "../src/App";
import { defaultEventData } from "../__mocks__/cwEvents";
import { mockStateContext } from "../__mocks__/stateContext";

type Global = typeof globalThis & {
  wcjcal_ajax_obj?: typeof defaultEventData;
};
jest.mock("@popperjs/core", () => {
  const originalModule = jest.requireActual("@popperjs/core");
  return {
    __esModule: true,
    ...originalModule,
    createPopper: jest.fn(() => "mocked createPopper"),
  };
});


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
  (global as Global)["wcjcal_ajax_obj"] = defaultEventData;

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
  delete (global as Global)["wcjcal_ajax_obj"];
});

it("Snapshot", async () => {
  render(
    <StateContext.Provider value={mockStateContext}>
      <EventGroup category="Lindy Hop" />
    </StateContext.Provider>
  );
  expect(container?.innerHTML).toMatchSnapshot();
});

it("Events are selected at start", async () => {
  const renderResult = render(<App />);

  const [groupInput, eventInputs] = getEventGroupInputs(renderResult);
  expect(groupInput).toBeChecked();
  eventInputs.forEach((eventInput) => expect(eventInput).toBeChecked());
});

it("Clicking deselect all deselects all events and groups", async () => {
  const renderResult = render(<App />);
  const deselectAllBtn = await renderResult.findByText("Deselect all");

  act(() => deselectAllBtn.click());

  const [groupInput, eventInputs] = getEventGroupInputs(renderResult);
  expect(groupInput).not.toBeChecked();
  eventInputs.forEach((eventInput) => expect(eventInput).not.toBeChecked());
});

it("Click event in calendar opens popper", async () => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");


  const initialDate =
    mockStateContext.state.events.byId["1"].occasions[0].start;


  const renderResult = render(
    <StateContext.Provider value={mockStateContext}>
      <Calendar initialDate={initialDate} />
    </StateContext.Provider>
  );

  const fcEventContainer = renderResult.container.querySelector(
    ".fc-event-title-container"
  ) as HTMLDivElement;

  act(() => {
    fcEventContainer.click();
    jest.runAllTimers();
  });

  // renderResult.debug();
  expect(createPopper).toHaveBeenCalledTimes(1);
});

