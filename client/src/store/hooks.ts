import { useMemo } from "react";

export type Dispatch<State> = (_: State) => State;
export type Reducer<State> = [_: State, _: Dispatch<State>];

export type ActionMap<M extends { [index: string]: any }> = {
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
  reducer: [state: State],
  mapStateToSelectors: (_: State) => Selectors
): Selectors {
  const [state] = reducer;
  const selectors = useMemo(() => mapStateToSelectors(state), [state, mapStateToSelectors]);
  return selectors;
}

export function useActions<State, Actions>(
  reducer: Reducer<State>,
  mapDispatchToActions: (_: Dispatch<State>) => Actions
): Actions {
  const [, dispatch] = reducer;
  const actions = useMemo(() => mapDispatchToActions(dispatch), [dispatch, mapDispatchToActions]);
  return actions;
}
