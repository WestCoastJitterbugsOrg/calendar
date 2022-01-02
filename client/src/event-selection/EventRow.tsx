import ReactDOM from "react-dom";
import EventCheckbox from "./EventCheckbox";
import "jquery-modal";
import "jquery-modal/jquery.modal.css";

interface EventRowProps {
  event: Wcj.Event;
  checked: boolean;
  toggle: () => void;
  showInfo: () => void;
}

export default function EventRow(props: EventRowProps) {
  return (
    <div
      className="flex flex-row items-center px-2 my-2"
      style={{ minHeight: "2rem" }}
      onClick={props.toggle}
    >
      <div
        className="h-4 w-4 mr-2 flex-none"
        onClick={(ce) => {
          ce.stopPropagation();

          ReactDOM.render(
            <ModalContent event={props.event}></ModalContent>,
            document.getElementById("modalRoot"),
            () => {
              jQuery(".modal").modal();
            }
          );
        }}
      >
        <InfoButton />
      </div>
      <div className="flex-grow cursor-pointer pr-2 leading-tight">
        {props.event.title}
      </div>
      <div className="flex-none cursor-pointer">
        <EventCheckbox color="#AB2814" checked={props.checked} />
      </div>
    </div>
  );
}

function ModalContent({ event }: { event: Wcj.Event }) {
  return (
    <div className="modal">
      <div className="text-2xl">{event.title} </div>
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
