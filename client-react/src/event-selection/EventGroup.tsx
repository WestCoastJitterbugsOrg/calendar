import React from "react";
import { Wcj } from "../types";

type EventGroupData = {
  eventCategory: Wcj.EventCategory;
};

export default class EventGroup extends React.Component<EventGroupData> {
  render() {
    return (
      <div>
        <div className="bg-wcj-cyan">{this.props.eventCategory.category}</div>

        {this.props.eventCategory.events.map((event) => (
          <div>{event.title}</div>
        ))}
      </div>
    );
  }
}
