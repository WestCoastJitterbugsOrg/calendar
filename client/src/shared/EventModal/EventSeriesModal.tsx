import { useContext } from "react";
import Modal from "react-modal";
import { StateContext } from "@app/App";
import { EventActionTypes } from "@app/store/reducers";
import { EventSeriesModalContent } from "./EventModalContent";

Modal.setAppElement("#wcjcal");

export function EventSeriesModal() {
  const { state, dispatch } = useContext(StateContext);

  return (
    <Modal
      onRequestClose={() => {
        dispatch({
          type: EventActionTypes.modalClosed,
        });
      }}
      isOpen={!!state.eventModal}
      className={`absolute top-1/2 left-1/2 right-auto bottom-auto -mr-[50%]
         -translate-x-1/2 -translate-y-1/2  max-w-[800px] max-h-[max(80vh,200px)] 
         overflow-auto bg-wcj-sand p-5 sm:p-10 rounded-2xl`}
      overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-75"
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