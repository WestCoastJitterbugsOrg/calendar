import React from "react";
import { Wcj } from "../types";
import EventContainerHeader from "./EventContainerHeader";
import EventGroup from "./EventGroup";

type MyProps = {
  eventCategories: Wcj.EventCategory[];
};

export default class EventContainer extends React.Component<MyProps> {
  render() {
    return (
      <div className="absolute bottom-0 top-20 w-full overflow-y-scroll">
        <EventContainerHeader></EventContainerHeader>
        <div>
          {this.props.eventCategories.map((events) => (
            <EventGroup eventCategory={events}></EventGroup>
          ))}
        </div>
      </div>
    );
  }
}