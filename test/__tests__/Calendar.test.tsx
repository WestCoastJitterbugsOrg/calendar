import { Calendar } from "@app/calendar/Calendar";
import { StateWrapper } from "@app/store/StateWrapper";
import popper, { createPopper } from "@popperjs/core";
import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { mockStore } from "../__mocks__/stateContext";

jest.mock("@popperjs/core", () => {
  const originalModule = jest.requireActual<typeof popper>("@popperjs/core");
  return {
    __esModule: true,
    ...originalModule,
    createPopper: jest.fn(() => "mocked createPopper"),
  };
});

it("Click event in calendar opens popper", async () => {
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

  await act(() => {
    fcEventContainer?.click();
    jest.runAllTimers();
  });

  expect(createPopper).toHaveBeenCalledTimes(1);
});

it("Can open list view", async () => {
  const initialDate = mockStore.events["1"].occasions[0].start;

  const { baseElement } = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <Calendar initialDate={initialDate} />
    </StateWrapper>
  );

  const fcListEternalButton = baseElement.querySelector<HTMLDivElement>(
    ".fc-listEternal-button"
  );

  await act(() => {
    fcListEternalButton?.click();
  });

  expect(baseElement.querySelector(".fc-listEternal-view")).toBeTruthy();
});
