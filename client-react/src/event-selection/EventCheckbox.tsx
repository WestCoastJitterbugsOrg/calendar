import "./EventCheckbox.css";

interface EventCheckboxProps {
  color: string;
  checked: boolean;
}

export default function EventCheckbox(props: EventCheckboxProps) {
  return (
    <div
      className={`event-checkbox w-6 h-6 border rounded-full border-grey-500 ${
        props.checked && "checked"
      }`}
      style={
        props.checked
          ? {
              backgroundColor: props.color,
              border: "none",
            }
          : {}
      }
    ></div>
  );
}

interface GroupCheckboxProps {
  state: "all" | "some" | "none";
  onClick: () => void;
}

export function GroupCheckbox(props: GroupCheckboxProps) {
  return (
    <div
      className={`eventgroup-checkbox ${props.state}`}
      onClick={props.onClick}
    ></div>
  );
}
