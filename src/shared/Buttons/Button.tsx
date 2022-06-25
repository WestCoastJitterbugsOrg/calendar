export interface ButtonData {
  title: string;
  size?: "sm" | "lg";
  onClick?: () => void;
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
      {props.title}
    </button>
  );
}
