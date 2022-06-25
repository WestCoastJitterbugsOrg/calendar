import "@testing-library/jest-dom";
import EventGroup from "@app/event-selection/event-group/EventGroup";
import { unmountComponentAtNode } from "react-dom";
import { mockStore } from "../__mocks__/stateContext";
import { createRenderer } from "../test-utils";
import { act } from "react-dom/test-utils";
import StateWrapper from "@app/store/StateWrapper";
import { fireEvent } from "@testing-library/react";
import EventItem from "@app/event-selection/event/EventItem";

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

it("Unchecking a group causes all events to be unchecked", async () => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
  const result = renderer.render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventGroup category="Lindy Hop" />
    </StateWrapper>
  );

  const el = result.getByTestId("group-checkbox");

  act(() => {
    fireEvent.click(el);
    jest.runAllTimers();
  });

  const allEventCheckboxes = result.getAllByTestId(
    "event-checkbox"
  ) as HTMLInputElement[];
  expect(allEventCheckboxes.every((x) => x.checked)).toBeFalsy();
});

it("Unchecking an events causes it to be unchecked", async () => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
  const result = renderer.render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventItem event={Object.values(mockStore.events)[0]} />
    </StateWrapper>
  );

  const el = result.getByTestId("event-item");

  act(() => {
    fireEvent.click(el);
    jest.runAllTimers();
  });

  const eventCheckbox = result.getByTestId(
    "event-checkbox"
  ) as HTMLInputElement;
  expect(eventCheckbox.checked).toBeFalsy();
});
