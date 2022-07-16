import infoCircle from "@app/assets/info-circle.svg";
import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";

interface Props {
  eventId: string;
}

export function InfoButton(props: Props) {
  const { setEventModal } = useContext(StateContext);
  return (
    <img
      data-testid="info-button"
      src={infoCircle}
      className="mr-2 block h-4 w-4 flex-none cursor-pointer text-black opacity-50 hover:opacity-100"
      onClick={() => setEventModal?.(props.eventId)}
    />
  );
}
