import { useEffect, useRef } from "react";

interface GroupCheckboxProps {
  state: "all" | "some" | "none";
  onClick: () => void;
}

export function GroupCheckbox(props: GroupCheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = props.state === "some";
    }
  }, [props.state]);

  return (
    <label className="w-[22px]">
      <input
        ref={checkboxRef}
        type="checkbox"
        data-testid="group-checkbox"
        className={`
        checkbox

        m-0 h-5 w-5 rounded-md border-[2px]
        border-solid border-dark bg-light
        
        checked:after:left-[6px] checked:after:-top-[5px] 
        checked:after:h-4 checked:after:w-2 
        checked:after:rotate-[50deg] checked:after:rounded-br-[3px]
        checked:after:border-0 checked:after:border-b-[3px] 
        checked:after:border-r-[3px] checked:after:border-solid checked:after:border-dark
        
        indeterminate:after:top-[6px] indeterminate:after:left-[2px] indeterminate:after:h-1 indeterminate:after:w-3 
        indeterminate:after:rotate-0 indeterminate:after:bg-dark
        `}
        readOnly
        checked={props.state === "all"}
        onClick={props.onClick}
      />
    </label>
  );
}
