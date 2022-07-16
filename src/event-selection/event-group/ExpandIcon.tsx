import plusIcon from "@app/assets/plus.svg";

interface Props {
  open: boolean;
}

export function ExpandIcon(props: Props) {
  return (
    <img
      className={`h-4 w-4 flex-shrink-0 transform transition duration-200 ${
        props.open ? "rotate-45" : ""
      }`}
      src={plusIcon}
    />
  );
}
