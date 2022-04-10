import { useMemo } from "react";

export type Dispatch<State> = (_: State) => State;
export type Reducer<State> = [_: State, _: Dispatch<State>];

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export function useSelectors<State, Selectors>(
  state: State,
  mapStateToSelectors: (_: State) => Selectors
): Selectors {
  return useMemo(
    () => mapStateToSelectors(state),
    [state, mapStateToSelectors]
  );
}

export function useActions<State, Actions>(
  [, dispatch]: Reducer<State>,
  mapDispatchToActions: (_: Dispatch<State>) => Actions
): Actions {
  return useMemo(
    () => mapDispatchToActions(dispatch),
    [dispatch, mapDispatchToActions]
  );
}
