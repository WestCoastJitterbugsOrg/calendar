import "@testing-library/jest-dom";
import { StateContext } from "@app/App";
import Calendar from "@app/calendar";
import { createPopper } from "@popperjs/core";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { defaultEventData } from "../__mocks__/cwEvents";
import { mockStateContext } from "../__mocks__/stateContext";
import { createRenderer, Global } from "../test-utils";

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
  (global as Global)["wcjcal_ajax_obj"] = defaultEventData;

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
  delete (global as Global)["wcjcal_ajax_obj"];
});

it("Click event in calendar opens popper", async () => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");

  const initialDate =
    mockStateContext.state.events.byId["1"].occasions[0].start;

  const renderResult = renderer.render(
    <StateContext.Provider value={mockStateContext}>
      <Calendar initialDate={initialDate} />
    </StateContext.Provider>
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
