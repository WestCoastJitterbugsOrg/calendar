import React from "react";
import EventCheckbox from "./EventCheckbox";
import Modal from "react-modal";

const customStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 800,
    maxHeight: "max(80vh, 200px)",
    overflow: "auto",
  },
  overlay: {
    zIndex: 10000,
  },
};

Modal.setAppElement("#wcjcal");

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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ModalContent
          event={props.event}
          onCloseClick={closeModal}
        ></ModalContent>
      </Modal>
    </>
  );
}

function ModalContent({
  event,
  onCloseClick,
}: {
  event: Wcj.Event;
  onCloseClick: () => void;
}) {
  return (
    <div className="modal-content">
      <div
        style={{ position: "absolute", right: 20, top: 20, cursor: "pointer" }}
        onClick={onCloseClick}
      >
        ✖
      </div>
      <h4>{event.title}</h4>
      {event.description.includes("<p>") ? (
        <div dangerouslySetInnerHTML={{ __html: event.description }} />
      ) : (
        <p>event.description</p>
      )}
      <div>
        <strong>Where:</strong> {event.place}
      </div>
      <div>
        <strong>Price:</strong> {event.price}
      </div>
      <div>
        <strong>Instructors:</strong> {event.instructors}
      </div>
      <div>
        <strong>Registration:</strong>
        <a href={event.registrationUrl} target="_blank" rel="noreferrer">
          Click here
        </a>
      </div>
    </div>
  );
}

function InfoButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="text-black opacity-50 hover:opacity-100 cursor-pointer"
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
