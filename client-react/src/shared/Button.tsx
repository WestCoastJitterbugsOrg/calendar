import React from "react";

type ButtonData = {
  title: string,
  className: string
};

export default class Button extends React.PureComponent<ButtonData> {
  render() {
    return (
      <button className={[
        "bg-wcj-red text-white font-bold",
        "py-2 px-5 rounded-full",
        "transition-colors hover:bg-wcj-red-hover",
        this.props.className
      ].join(" ")}>
        {this.props.title}
      </button>
    );
  }
}
