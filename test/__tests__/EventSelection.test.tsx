import "@testing-library/jest-dom";
import { unmountComponentAtNode } from "react-dom";
import { mockStore } from "../__mocks__/stateContext";
import { createRenderer } from "../test-utils";
import { act } from "react-dom/test-utils";
import StateWrapper from "@app/store/StateWrapper";
import { RenderResult } from "@testing-library/react";
import EventSelection from "@app/event-selection/EventSelection";

const renderer = createRenderer();

beforeEach(() => {
  renderer.container = document.createElement("div");
  renderer.container.id = "wcjcal";
  document.body.appendChild(renderer.container);
});

afterEach(() => {
  if (renderer.container != null) {
    unmountComponentAtNode(renderer.container);
    renderer.container.remove();
  }
  renderer.container = null;
});
it("EventSelection Snapshot", async () => {
  renderer.render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventSelection />
    </StateWrapper>
  );
  expect(renderer.container?.innerHTML).toMatchSnapshot();
});

it("Events are selected at start", async () => {
  const renderResult = renderer.render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventSelection />
    </StateWrapper>
  );

  const [groupInput, eventInputs] = getEventGroupInputs(renderResult);
  expect(groupInput).toBeChecked();
  eventInputs.forEach((eventInput) => expect(eventInput).toBeChecked());
});

it("Clicking deselect all deselects all events and groups", async () => {
  const renderResult = renderer.render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventSelection />
    </StateWrapper>
  );
  const deselectAllBtn = await renderResult.findByText("Deselect all");

  act(() => deselectAllBtn.click());

  const [groupInput, eventInputs] = getEventGroupInputs(renderResult);
  expect(groupInput).not.toBeChecked();
  eventInputs.forEach((eventInput) => expect(eventInput).not.toBeChecked());
});

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
