import { useContext } from "react";
import { StateContext } from "../App";
import Button from "../shared/Button";
import { EventActionTypes } from "../store/reducers";

export default function ToggleAllButtons() {
  const { dispatch} = useContext(StateContext);
  
  return (
    <div className="bg-wcj-black flex flex-row h-16 justify-center items-center space-x-4">
      <Button
        title="Select all"
        size="sm"
        onClick={() =>
          dispatch({ type: EventActionTypes.allToggled, payload: { show: true} })
        }
      />
      <Button
        title="Deselect all"
        size="sm"
        onClick={() =>
          dispatch({ type: EventActionTypes.allToggled, payload: { show: false} })
        }
      />
    </div>
  );
}
