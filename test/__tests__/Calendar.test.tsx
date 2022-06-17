import "@testing-library/jest-dom";
import Calendar from "@app/calendar";
import { createPopper } from "@popperjs/core";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { mockStore } from "../__mocks__/stateContext";
import { createRenderer, Global } from "../test-utils";
import StateWrapper from "@app/store/StateWrapper";

const renderer = createRenderer();

jest.mock("@popperjs/core", () => {
  const originalModule = jest.requireActual("@popperjs/core");
  return {
    __esModule: true,
    ...originalModule,
    createPopper: jest.fn(() => "mocked createPopper"),
  };
});

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

it("Click event in calendar opens popper", async () => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");

  const initialDate = mockStore.events["1"].occasions[0].start;

  const renderResult = renderer.render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <Calendar initialDate={initialDate} />
    </StateWrapper>
  );

  const fcEventContainer = renderResult.container.querySelector<HTMLDivElement>(
    ".fc-event-title-container"
  );

  act(() => {
    fcEventContainer?.click();
    jest.runAllTimers();
  });

  expect(createPopper).toHaveBeenCalledTimes(1);
});

it("Can open list view", async () => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");

  const initialDate = mockStore.events["1"].occasions[0].start;

  const renderResult = renderer.render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <Calendar initialDate={initialDate} />
    </StateWrapper>
  );

  const fcListEternalButton = renderResult.container.querySelector<HTMLDivElement>(
    ".fc-listEternal-button"
  );

  act(() => {
    fcListEternalButton?.click();
    jest.runAllTimers();
  });

  expect(renderResult.baseElement.querySelector(".fc-listEternal-view")).toBeTruthy();
});
