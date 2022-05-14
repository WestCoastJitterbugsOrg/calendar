import { ReactElement } from "react";
import { render as libRender } from "@testing-library/react";
import { defaultEventData } from "./__mocks__/cwEvents";

export type Global = typeof globalThis & {
  wcjcal_ajax_obj?: typeof defaultEventData;
};

interface Renderer {
  container: HTMLDivElement | null;
  render: (ui: ReactElement) => ReturnType<typeof libRender>;
}

export function createRenderer() {
  const ret: Renderer = {
    container: null,
    render: function (ui: ReactElement) {
      if (ret.container != null) {
        return libRender(ui, { container: ret.container });
      } else {
        throw "Container not initialized";
      }
    },
  };

  return ret;
}
