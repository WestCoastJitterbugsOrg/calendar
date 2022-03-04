import { useContext } from "react";
import { StateContext } from "../App";
import Button from "../shared/Buttons/Button";
import { EventActionTypes } from "../store/reducers";

export default function ToggleAllButtons() {
  const { dispatch } = useContext(StateContext);

  return (
    <div className="bg-wcj-black flex flex-row h-16 justify-center items-center space-x-4 font-xs">
      <Button
        title="Select all"
        size="md"
        onClick={() =>
          dispatch({
            type: EventActionTypes.allToggled,
            payload: { show: true },
          })
        }
      />
      <Button
        title="Deselect all"
        size="md"
        onClick={() =>
          dispatch({
            type: EventActionTypes.allToggled,
            payload: { show: false },
          })
        }
      />
    </div>
  );
}
