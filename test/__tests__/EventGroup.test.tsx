import "@testing-library/jest-dom";
import EventGroup from "@app/event-selection/event-group/EventGroup";
import { mockStore } from "../__mocks__/stateContext";
import StateWrapper from "@app/store/StateWrapper";
import { fireEvent, render, act } from "@testing-library/react";
import EventItem from "@app/event-selection/event/EventItem";

it("Unchecking a group causes all events to be unchecked", async () => {
  const result = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventGroup category="Lindy Hop" />
    </StateWrapper>
  );

  const el = await result.findByTestId("group-checkbox");

  act(() => {
    fireEvent.click(el);
  });

  const allEventCheckboxes = (await result.findAllByTestId(
    "event-checkbox"
  )) as HTMLInputElement[];
  expect(allEventCheckboxes.every((x) => x.checked)).toBeFalsy();
});

it("Unchecking an events causes it to be unchecked", async () => {
  const result = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventItem event={Object.values(mockStore.events)[0]} />
    </StateWrapper>
  );

  const el = await result.findByTestId("event-item");

  act(() => {
    fireEvent.click(el);
  });

  const eventCheckbox = (await result.findByTestId(
    "event-checkbox"
  )) as HTMLInputElement;
  expect(eventCheckbox.checked).toBeFalsy();
});
