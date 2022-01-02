import React from "react";
import { StateContext } from "../App";

export default class Modal extends React.Component {
  $el?: JQuery;
  el: HTMLDivElement | null = null;

  componentDidMount() {
    if (!this.el) {
      throw Error("No element referenced as modal");
    }

    // const value = this.context;
  }

  render() {
    return (
      <>
        <StateContext.Consumer>
          {(value) => {
            console.log(value);
            if (value.state.showModal && this.$el) {
              jQuery("<div>" + value.state.showModal + "</div>").appendTo(this.$el);
              this.$el.modal();
              return this.$el;
            }
          }}
        </StateContext.Consumer>
        <div ref={(el) => (this.el = el)}></div>
      </>
    );
  }
}
