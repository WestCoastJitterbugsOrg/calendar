export interface ButtonData {
  size?: "sm" | "lg";
  onClick?: () => void;
  children: JSX.Element | string;
}

export default function Button(props: ButtonData) {
  return (
    <button
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
