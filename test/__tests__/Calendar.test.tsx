import "@testing-library/jest-dom";
import { createPopper } from "@popperjs/core";
import { mockStore } from "../__mocks__/stateContext";
import StateWrapper from "@app/store/StateWrapper";
import Calendar from "@app/calendar/Calendar";
import { render, act } from "@testing-library/react";

jest.mock("@popperjs/core", () => {
  const originalModule = jest.requireActual("@popperjs/core");
  return {
    __esModule: true,
    ...originalModule,
    createPopper: jest.fn(() => "mocked createPopper"),
  };
});

it("Click event in calendar opens popper", () => {
  jest.useFakeTimers();

  const initialDate = mockStore.events["1"].occasions[0].start;

  const { baseElement } = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <Calendar initialDate={initialDate} />
    </StateWrapper>
  );

  const fcEventContainer = baseElement.querySelector<HTMLDivElement>(
    ".fc-event-title-container"
  );

  act(() => {
    fcEventContainer?.click();
    jest.runAllTimers();
  });

  expect(createPopper).toHaveBeenCalledTimes(1);
});

it("Can open list view", () => {
  const initialDate = mockStore.events["1"].occasions[0].start;

  const { baseElement } = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <Calendar initialDate={initialDate} />
    </StateWrapper>
  );

  const fcListEternalButton = baseElement.querySelector<HTMLDivElement>(
    ".fc-listEternal-button"
  );

  act(() => {
    fcListEternalButton?.click();
  });

  expect(baseElement.querySelector(".fc-listEternal-view")).toBeTruthy();
});
