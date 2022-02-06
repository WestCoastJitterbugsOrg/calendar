import React from "react";

type ButtonData = {
  title: string;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
};

export default function Button(props: ButtonData) {
  const paddingClasses = (() => {
    switch (props.size) {
      case "sm":
        return "px-3 py-1";
      case "lg":
        return "px-6 py-3";
      default:
        return "px-4 py-2";
    }
  })();

  return (
    <button
      className={[
        "bg-wcj-red text-white font-bold text-base leading-4",
        "rounded-full",
        "transition-colors hover:bg-wcj-red-hover",
        paddingClasses,
      ].join(" ")}
      onClick={props.onClick}
    >
      {props.title}
      
    </button>
  );
}
