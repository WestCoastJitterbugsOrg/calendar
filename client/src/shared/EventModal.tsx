import React from "react";
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
    backgroundColor: "rgba(0,0,0,75%)",
  },
};

Modal.setAppElement("#wcjcal");

export function EventSeriesModal({
  event,
  isOpen,
  onRequestClose,
}: {
  event: Wcj.Event;
  isOpen: boolean;
  onRequestClose: () => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      parentSelector={() =>
        document.querySelector<HTMLElement>("#wcjcal") || document.body
      }
    >
      <EventSeriesModalContent
        event={event}
        onCloseClick={onRequestClose}
      ></EventSeriesModalContent>
    </Modal>
  );
}

function EventSeriesModalContent({
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
