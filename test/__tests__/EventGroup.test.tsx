import "@testing-library/jest-dom";
import { EventGroup } from "@app/event-selection";
import { unmountComponentAtNode } from "react-dom";
import { mockStore } from "../__mocks__/stateContext";
import { createRenderer } from "../test-utils";
import { act } from "react-dom/test-utils";
import StateWrapper from "@app/store/StateWrapper";
import { fireEvent } from "@testing-library/react";

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

it("Snapshot", async () => {
  renderer.render(
    <StateWrapper initialContext={mockStore}>
      <EventGroup category="Lindy Hop" />
    </StateWrapper>
  );
  expect(renderer.container?.innerHTML).toMatchSnapshot();
});

it("Unchecking a group causes all events to be unchecked", async () => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
  const result = renderer.render(
    <StateWrapper initialContext={mockStore}>
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
