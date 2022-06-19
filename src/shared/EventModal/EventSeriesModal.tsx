import { useContext, useEffect } from "react";
import Modal from "react-modal";
import { EventSeriesModalContent } from "./EventModalContent";
import { appContainer } from "@app/app-container";
import { StateContext } from "@app/store/StateWrapper";

export function EventSeriesModal() {
  useEffect(() => {
    Modal.setAppElement(document.body ?? appContainer);
  }, []);

  const { events, eventModal, setEventModal } = useContext(StateContext);

  return (
    <Modal
      onRequestClose={() => setEventModal?.(false)}
      preventScroll={true}
      isOpen={!!eventModal}
      className={`absolute top-1/2 left-1/2 right-auto bottom-auto -mr-[50%]
         -translate-x-1/2 -translate-y-1/2  max-w-[800px] max-h-[max(80vh,200px)] 
         overflow-auto bg-wcj-sand p-5 sm:p-10 rounded-md outline-none`}
      overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-75"
      parentSelector={() => appContainer}
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
