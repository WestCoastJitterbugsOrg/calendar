import { StateContext } from "@app/App";
import { Button } from "@app/shared";
import { useContext } from "react";

export default function ToggleAllButtons() {
  const { dispatch } = useContext(StateContext);

  return (
    <div className="bg-wcj-black flex flex-row h-16 justify-center items-center space-x-4 font-xs">
      <Button
        title="Select all"
        size="md"
        onClick={() =>
          dispatch({
            type: "allToggled",
            payload: { show: true },
          })
        }
      />
      <Button
        title="Deselect all"
        size="md"
        onClick={() =>
          dispatch({
            type: "allToggled",
            payload: { show: false },
          })
        }
      />
    </div>
  );
}
