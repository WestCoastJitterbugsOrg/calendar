import { appContainer } from "@app/app-container";
import { StateContext } from "@app/store/StateWrapper";
import { useContext, useEffect, useRef } from "react";
import Modal from "react-modal";
import { EventSeriesModalContent } from "./EventModalContent";

interface Props {
  parent?: HTMLElement;
}

const rootHtmlElement = document.documentElement;

export function EventSeriesModal(props: Props) {
  const { eventModal, setEventModal } = useContext(StateContext);
  const previousOverflowStyle = useRef<string>();
  useEffect(() => {
    // Code to prevent scrolling events getting triggered on the main page:
    if (eventModal) {
      previousOverflowStyle.current = rootHtmlElement.style.overflow;
      // Hide root html element overflow when showing modal
      rootHtmlElement.style.overflow = "hidden";
    } else if (previousOverflowStyle?.current) {
      // When modal is closed, we either have to reapply the style that was before
      rootHtmlElement.style.overflow = previousOverflowStyle.current;
    } else {
      // Or remove it if there was none
      rootHtmlElement.style.removeProperty("overflow");
    }
  }, [eventModal]);

  return (
    <Modal
      onRequestClose={() => setEventModal?.(undefined)}
      preventScroll={true}
      isOpen={!!eventModal}
      className={`
        pointer-events-auto absolute top-1/2 left-1/2 right-auto bottom-auto
        -mr-[50%] h-[max(80vh,200px)] max-w-[900px] -translate-x-1/2 
        -translate-y-1/2 rounded-md bg-dark pt-12 outline-none`}
      overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-75"
      parentSelector={() => props.parent ?? appContainer}
      appElement={props.parent ?? document.body ?? appContainer}
    >
      {eventModal && <EventSeriesModalContent eventId={eventModal} />}
    </Modal>
  );
}
