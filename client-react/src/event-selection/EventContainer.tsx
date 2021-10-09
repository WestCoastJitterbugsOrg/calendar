import React from "react";
import EventContainerHeader from "./EventContainerHeader";
import "../shared/spinner.css";



export default function EventContainer(props: {
  children: React.ReactChild[];
}) {
  return (
    <>
      <div className="flex-none">
        <EventContainerHeader />
      </div>
      <div className="flex-grow w-full overflow-y-scroll bg-wcj-sand divide-y divide-wcj-mint">
        {props.children}
      </div>
    </>
  );
}
