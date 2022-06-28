import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";
import { EventGroup } from "./event-group/EventGroup";
import { ToggleAllButtons } from "./ToggleAllButtons";

export function EventSelection() {
  const { categories } = useContext(StateContext);
  return (
    <>
      <div className="flex-none">
        <ToggleAllButtons />
      </div>
      <div
        className="w-full flex-grow divide-y divide-secondary-alt overflow-auto bg-light"
        data-testid="event-selection-groups"
      >
        {Object.keys(categories).map((categoryId) => (
          <EventGroup key={categoryId} category={categoryId} />
        ))}
      </div>
    </>
  );
}
