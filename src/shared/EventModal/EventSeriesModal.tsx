import { useContext } from "react";
import Modal from "react-modal";
import { EventSeriesModalContent } from "./EventModalContent";
import { appContainer } from "@app/app-container";
import { StateContext } from "@app/store/StateWrapper";

export function EventSeriesModal(props: { parent?: HTMLElement }) {
  const { events, eventModal, setEventModal } = useContext(StateContext);

  return (
    <Modal
      onRequestClose={() => setEventModal?.(false)}
      preventScroll={true}
      isOpen={!!eventModal}
      className={`
        absolute top-1/2 left-1/2 right-auto bottom-auto -mr-[50%]
        max-h-[max(80vh,200px)] max-w-[800px]  -translate-x-1/2 -translate-y-1/2 
        overflow-auto rounded-md bg-light p-5 outline-none sm:p-10`}
      overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-75"
      parentSelector={() => props.parent ?? appContainer}
      appElement={props.parent ?? document.body ?? appContainer}
    >
      {eventModal && (
        <EventSeriesModalContent
          event={events[eventModal]}
          onCloseClick={() => setEventModal?.(false)}
        ></EventSeriesModalContent>
      )}
    </Modal>
  );
}
