import { useMemo } from "react";

export type Dispatch<State> = (_: State) => State;
export type Reducer<State> = [State, Dispatch<State>];

export function useSelectors<State, Selectors>(
  state: State,
  mapStateToSelectors: (_: State) => Selectors
) {
  return useMemo(
    () => mapStateToSelectors(state),
    [state, mapStateToSelectors]
  );
}

export function useActions<State, Actions>(
  [, dispatch]: Reducer<State>,
  mapDispatchToActions: (_: Dispatch<State>) => Actions
) {
  return useMemo(
    () => mapDispatchToActions(dispatch),
    [dispatch, mapDispatchToActions]
  );
}
