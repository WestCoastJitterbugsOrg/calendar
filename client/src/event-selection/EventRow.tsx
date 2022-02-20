import React from "react";
import { EventSeriesModal } from "../shared/EventModal";
import EventCheckbox from "./EventCheckbox";

interface EventRowProps {
  event: Wcj.Event;
  checked: boolean;
  toggle: () => void;
  showInfo: () => void;
}

export default function EventRow(props: EventRowProps) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div
        className="flex flex-row items-center px-2 my-2 min-h-8"
        onClick={props.toggle}
      >
        <div className="h-4 w-4 mr-2 flex-none" onClick={openModal}>
          <InfoButton />
        </div>
        <div className="flex-grow cursor-pointer pr-2 leading-tight">
          {props.event.title}
        </div>
        <div className="flex-none cursor-pointer">
          <EventCheckbox color="#AB2814" checked={props.checked} />
        </div>
      </div>

      <EventSeriesModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        event={props.event}
      ></EventSeriesModal>
    </>
  );
}

function InfoButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="block text-black opacity-50 hover:opacity-100 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
