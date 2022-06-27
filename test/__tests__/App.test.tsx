import "@testing-library/jest-dom";
import App from "../../src/App";
import { defaultEventData } from "../__mocks__/cwEvents";
import { storeConsentCookie } from "@app/services/cookies";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import * as ics from "@app/services/ics";
import { mockStore } from "../__mocks__/stateContext";
import Error from "@app/Error";

type Global = typeof globalThis & {
  wcjcal_ajax_obj?: typeof defaultEventData;
};

beforeEach(() => {
  (global as Global).wcjcal_ajax_obj = defaultEventData;
  document.cookie = "";
});

afterEach(() => {
  delete (global as Global).wcjcal_ajax_obj;
});

it("Cookie header is shown by default", async () => {
  const renderResult = render(<App />);
  const cookieHeader = await renderResult?.findByTestId("cookie-header");

  expect(cookieHeader).toBeTruthy();
});

it("Cookie header is hidden if there are cookies", async () => {
  await act(async () => {
    storeConsentCookie();
  });
  const renderResult = render(<App />);
  const cookieHeader = renderResult.queryByTestId("cookie-header");
  expect(cookieHeader).toBeNull();
});

it("undefined data results in error", () => {
  act(() => {
    (global as Global).wcjcal_ajax_obj = {
      data: {
        events: {},
      },
    } as typeof defaultEventData;
  });
  const { baseElement } = render(<App />);
  expect(baseElement).toHaveTextContent("Error while loading data");
});

it("Clicking on Download calls exportICS", () => {
  const { getByTestId } = render(<App />);

  const exportICS = jest.spyOn(ics, "exportICS").mockImplementation();

  const downloadButton = getByTestId("download-ics-button")
    .children[0] as HTMLButtonElement;
  act(() => {
    downloadButton.click();
  });

  expect(exportICS).toHaveBeenCalledTimes(1);
  jest.restoreAllMocks();
});

it("exportICS creates an ics-file", async () => {
  const link = document.createElement("a");
  jest.spyOn(document, "createElement").mockImplementation(() => link);
  URL.createObjectURL = jest.fn((_) => "data:mock");
  URL.revokeObjectURL = jest.fn(() => undefined);

  await ics.exportICS(mockStore.events);
  expect(link.download).toEqual("wcj-events.ics");
  expect(link.href).toEqual("data:mock");
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

it("Error can output stringified json", async () => {
  const mockError = JSON.stringify(
    {
      this: "is",
      a: ["json", "wrapped", "in", "text", 1337],
    },
    null,
    4
  );
  const { findByTestId } = render(<Error message={mockError} />);

  const errorMessageEl = await findByTestId("error-message");

  expect(errorMessageEl.innerHTML).toEqual(mockError);
});

it("Error can output plain string", async () => {
  const mockError = "this is a plain string";
  const { findByTestId } = render(<Error message={mockError} />);

  const errorMessageEl = await findByTestId("error-message");

  expect(errorMessageEl.innerHTML).toEqual(mockError);
});
