import "@testing-library/jest-dom";
import { StateContext } from "@app/App";
import { EventGroup } from "@app/event-selection";
import { unmountComponentAtNode } from "react-dom";
import { defaultEventData } from "../__mocks__/cwEvents";
import { mockStateContext } from "../__mocks__/stateContext";
import { createRenderer, Global } from "../test-utils";
import { act } from "react-dom/test-utils";

const renderer = createRenderer();

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

it("Snapshot", async () => {
  renderer.render(
    <StateContext.Provider value={mockStateContext}>
      <EventGroup category="Lindy Hop" />
    </StateContext.Provider>
  );
  expect(renderer.container?.innerHTML).toMatchSnapshot();
});

it("Unchecking a group causes all events to be unchecked", async () => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
  const result = renderer.render(
    <StateContext.Provider value={mockStateContext}>
      <EventGroup category="Lindy Hop" />
    </StateContext.Provider>
  );

  const el = result.getByTestId("group-checkbox");
  
  act(() => {
    el.click();
    jest.runAllTimers();
  });

  const allEventCheckboxes = result.getAllByTestId("event-checkbox") as HTMLInputElement[];
  expect(allEventCheckboxes.every(x => x.checked)).toBeFalsy();
});
