import { useRef } from "react";

interface GroupCheckboxProps {
  state: "all" | "some" | "none";
  onClick: () => void;
}

export function GroupCheckbox(props: GroupCheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  if (checkboxRef.current) {
    checkboxRef.current.indeterminate = props.state === "some";
  }

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      className={`appearance-none w-5 h-5 bg-wcj-sand border-wcj-black border-solid border-[2px] rounded-md
                  after:content-[''] after:relative after:block after:opacity-0

                  indeterminate:after:opacity-100 indeterminate:after:top-[6px] indeterminate:after:left-[2px] indeterminate:after:w-3 indeterminate:after:h-1 
                  indeterminate:after:bg-wcj-black indeterminate:after:rounded-1 indeterminate:after:rotate-0

                  checked:after:opacity-100 checked:after:left-[6px] checked:after:-top-[5px] checked:after:w-2 checked:after:h-4 checked:after:rotate-[50deg] 
                  checked:after:border-solid checked:after:border-0
                  checked:after:border-b-[3px] checked:after:border-r-[3px] checked:after:border-wcj-black checked:after:rounded-br-[3px]
                  `}
      readOnly
      checked={props.state === "all"}
      onClick={props.onClick}
    />
  );
}
