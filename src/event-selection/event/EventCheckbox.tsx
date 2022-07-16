import checked from "@app/assets/checkmark.svg";

interface Props {
  checked: boolean | undefined;
}

export function EventCheckbox(props: Props) {
  return (
    <span
      role="checkbox"
      data-testid="event-checkbox"
      aria-readonly
      aria-checked={props.checked}
      className="cursor-pointer"
    >
      {props.checked && <img src={checked} />}
    </span>
  );
}
