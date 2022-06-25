import "@testing-library/jest-dom";
import { unmountComponentAtNode } from "react-dom";
import { mockStore } from "../__mocks__/stateContext";
import { createRenderer } from "../test-utils";
import StateWrapper, { StateContext } from "@app/store/StateWrapper";
import { EventSeriesModal } from "@app/shared/EventModal/EventSeriesModal";
import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";

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

it("EventModal Snapshot", async () => {
  const ModalWrapper = () => {
    const { setEventModal } = useContext(StateContext);
    useEffect(() => {
      act(() => {
        setEventModal?.(Object.values(mockStore.events)[0].id);
      });
    }, [setEventModal]);
    return <EventSeriesModal />;
  };

  renderer.render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <ModalWrapper />
    </StateWrapper>
  );

  expect(renderer.container?.innerHTML).toMatchSnapshot();
});
