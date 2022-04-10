import { buttonClassName } from "./ButtonHelpers";

export interface ButtonData {
  title: string;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
};

export default function Button(props: ButtonData) {
  return (
    <button className={buttonClassName(props.size)} onClick={props.onClick}>
      {props.title}
    </button>
  );
}

