import { useContext } from "react";
import Modal from "react-modal";
import { StateContext } from "../App";
import { EventActionTypes } from "../store/reducers";
import { LinkButton } from "./Button";

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

function displayDate(date: Date) {
  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });
}

export function EventSeriesModal(props: { ref?: HTMLElement }) {
  const { state, dispatch } = useContext(StateContext);

  return (
    <Modal
      onRequestClose={() => {
        dispatch({
          type: EventActionTypes.modalClosed,
        });
      }}
      isOpen={!!state.eventModal}
      style={customStyles}
      parentSelector={() => document.getElementById("wcjcal") || document.body}
    >
      {state.eventModal && (
        <EventSeriesModalContent
          event={state.events.byId[state.eventModal]}
          onCloseClick={() => {
            dispatch({ type: EventActionTypes.modalClosed });
          }}
        ></EventSeriesModalContent>
      )}
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
  const { first, last } = event.occasions.reduce(
    ({ first, last }, curr) => ({
      first: Math.min(first, curr.start.getTime()),
      last: Math.max(last, curr.end.getTime()),
    }),
    {
      first: Number.MAX_SAFE_INTEGER,
      last: Number.MIN_SAFE_INTEGER,
    }
  );

  return (
    <div className="modal-content">
      <div
        style={{ position: "absolute", right: 20, top: 20, cursor: "pointer" }}
        onClick={onCloseClick}
      >
        ✖
      </div>
      <h4 className="mt-0">{event.title}</h4>
      {event.description?.includes("<p>") ? (
        <div dangerouslySetInnerHTML={{ __html: event.description }} />
      ) : (
        <p>{event.description}</p>
      )}
      <div className="flex items-end">
        <div className="flex-grow">
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
            <strong>First occasion starts:</strong>{" "}
            {displayDate(new Date(first))}
          </div>
          <div>
            <strong>Last occasion ends:</strong> {displayDate(new Date(last))}
          </div>
        </div>
        <LinkButton
          title="Registration"
          href={event.registrationUrl}
          size="lg"
        />
      </div>
    </div>
  );
}
