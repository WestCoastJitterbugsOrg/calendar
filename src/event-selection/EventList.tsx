import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";
import EventGroup from "./event-group";

export default function EventList() {
  const { state } = useContext(StateContext);
  return (
    <>
      {state.categories.allIds.map((categoryId) => (
        <EventGroup key={categoryId} category={categoryId} />
      ))}
    </>
  );
}
