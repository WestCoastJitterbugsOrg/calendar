import { EventSelection } from "@app/event-selection/EventSelection";
import { StateWrapper } from "@app/store/StateWrapper";
import "@testing-library/jest-dom";
import { act, render, RenderResult } from "@testing-library/react";
import { mockStore } from "../__mocks__/stateContext";

it("EventSelection Snapshot", () => {
  const { baseElement } = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventSelection />
    </StateWrapper>
  );
  expect(baseElement).toMatchSnapshot();
});

it("Events are selected at start", async () => {
  const renderResult = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventSelection />
    </StateWrapper>
  );

  const [groupInput, eventInputs] = await getEventGroupInputs(renderResult);
  expect(groupInput).toBeChecked();
  eventInputs.forEach((eventInput) => expect(eventInput).toBeChecked());
});

it("Clicking deselect all deselects all events and groups", async () => {
  const renderResult = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventSelection />
    </StateWrapper>
  );
  const deselectAllBtn = await renderResult.findByText("Deselect all");

  await act(() => deselectAllBtn.click());

  const [groupInput, eventInputs] = await getEventGroupInputs(renderResult);
  expect(groupInput).not.toBeChecked();
  eventInputs.forEach((eventInput) => expect(eventInput).not.toBeChecked());
});

async function getEventGroupInputs(
  renderResult: RenderResult,
  groupSelector = (collection: HTMLCollection) => collection[0]
) {
  const eventGroup = groupSelector(
    (await renderResult.findByTestId("event-selection-groups")).children
  ).children;

  const group = eventGroup[0];
  const eventsWrapper = eventGroup[1];

  const groupInput = group.querySelector("[role='checkbox']");
  const eventInputs = Array.from(
    eventsWrapper.children[0].querySelectorAll("[role='checkbox']")
  );

  return [groupInput, eventInputs] as const;
}
