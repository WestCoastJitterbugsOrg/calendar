import { MaybeArray } from "../../types/utils";

type Props = {
  size?: "sm" | "lg";
  onClick?: () => void;
  children: MaybeArray<JSX.Element | string>;
}

export function Button(props: Props) {
  return (
    <button
      type="button"
      className={`button ${props.size ?? ""}
    `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
