import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";
import EventGroup from "./event-group/EventGroup";
import ToggleAllButtons from "./ToggleAllButtons";

export default function EventSelection() {
  const { categories } = useContext(StateContext);
  return (
    <>
      <div className="flex-none">
        <ToggleAllButtons />
      </div>
      <div
        className="flex-grow w-full overflow-auto bg-wcj-sand divide-y divide-wcj-mint"
        data-testid="event-selection-groups"
      >
        {Object.keys(categories).map((categoryId) => (
          <EventGroup key={categoryId} category={categoryId} />
        ))}
      </div>
    </>
  );
}
