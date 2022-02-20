import React from "react";

type ButtonData = {
  title: string;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
};

type ButtonLinkData = {
  title: string;
  size: "sm" | "md" | "lg";
  href: string;
};

const paddingClasses = (size: string) => {
  switch (size) {
    case "sm":
      return "px-3 py-1";
    case "lg":
      return "px-6 py-3";
    default:
      return "px-4 py-2";
  }
};

export const buttonClassName = (size: string) =>
  [
    "bg-wcj-red text-white font-bold text-base leading-4",
    "rounded-full",
    "transition-colors hover:bg-wcj-red-hover",
    paddingClasses(size),
  ].join(" ");

export default function Button(props: ButtonData) {
  return (
    <button className={buttonClassName(props.size)} onClick={props.onClick}>
      {props.title}
    </button>
  );
}

export function LinkButton(props: ButtonLinkData) {
  return (
    <a
      className={buttonClassName(props.size) + " no-underline"}
      href={props.href}
      target="_blank"
      rel="noreferrer"
    >
      {props.title}
    </a>
  );
}
