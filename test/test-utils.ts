import { ReactElement } from "react";
import {
  queries,
  render as libRender,
  RenderResult,
} from "@testing-library/react";
import { defaultEventData } from "./__mocks__/cwEvents";

export type Global = typeof globalThis & {
  wcjcal_ajax_obj?: typeof defaultEventData;
};

interface Renderer<C extends HTMLElement = HTMLDivElement> {
  container: C | null;
  render: <T extends HTMLElement = C>(
    ui: ReactElement
  ) => RenderResult<typeof queries, C, T>;
}

export function createRenderer() {
  const ret: Renderer = {
    container: null,
    render: (ui: ReactElement) => {
      if (ret.container != null) {
        return libRender(ui, { container: ret.container });
      } else {
        throw "Container not initialized";
      }
    }
  };

  return ret;
}
