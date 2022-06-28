interface Props {
  size?: "sm" | "lg";
  onClick?: () => void;
  children: JSX.Element | string;
}

export function Button(props: Props) {
  return (
    <button
      type="button"
      className={`button 
        ${props.size === "sm" ? "sm" : ""}
        ${props.size === "lg" ? "lg" : ""}
    `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
