import "@testing-library/jest-dom";
import { mockStore } from "../__mocks__/stateContext";
import { StateWrapper } from "@app/store/StateWrapper";
import { EventSeriesModal } from "@app/shared/EventModal/EventSeriesModal";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

it("EventModal Snapshot", () => {
  const eventModal = Object.values(mockStore.events)[0].id;

  const { baseElement } = render(
    <StateWrapper
      categories={mockStore.categories}
      events={mockStore.events}
      eventModal={eventModal}
    >
      <EventSeriesModal parent={document.body} />
    </StateWrapper>
  );

  expect(baseElement).toMatchSnapshot();
});

it("EventModal clicking on close button closes modal", async () => {
  const eventModal = Object.values(mockStore.events)[0].id;

  const { baseElement, findByTestId } = render(
    <StateWrapper
      categories={mockStore.categories}
      events={mockStore.events}
      eventModal={eventModal}
    >
      <EventSeriesModal parent={document.body} />
    </StateWrapper>
  );
  const modalCloseButton = await findByTestId("modal-close-button");

  act(() => {
    modalCloseButton.click();
  });

  expect(baseElement.querySelector(".ReactModalPortal")).toBeEmptyDOMElement();
});

it("EventModal clicking escape closes modal", () => {
  const eventModal = Object.values(mockStore.events)[0].id;

  const { baseElement } = render(
    <StateWrapper
      categories={mockStore.categories}
      events={mockStore.events}
      eventModal={eventModal}
    >
      <EventSeriesModal parent={document.body} />
    </StateWrapper>
  );

  act(() => {
    fireEvent.keyDown(document.activeElement || document.body, {
      keyCode: 27, // Escape
    });
  });

  const modalPortal =
    baseElement.querySelector<HTMLElement>(".ReactModalPortal");
  expect(modalPortal).toBeEmptyDOMElement();
});
