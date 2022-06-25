import "@testing-library/jest-dom";
import App from "../../src/App";
import { defaultEventData } from "../__mocks__/cwEvents";
import { storeConsentCookie } from "@app/services/cookies";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

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
