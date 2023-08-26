import style from './EventSeriesModal.module.scss';
import closeIcon from './assets/close.svg';
import { stateContext } from './store/StateWrapper';
import { useContext, useEffect, useRef } from 'react';
import * as Modal from 'react-modal';

type Props = {
	parent: HTMLElement;
};

const rootHtmlElement = document.documentElement;

export function EventSeriesModal(props: Props) {
	const { events, eventModal, setEventModal } = useContext(stateContext);
	const event = eventModal && events[eventModal];

	const previousOverflowStyle = useRef<string>();
	useEffect(() => {
		// Code to prevent scrolling events getting triggered on the main page:
		if (eventModal) {
			previousOverflowStyle.current = rootHtmlElement.style.overflow;
			rootHtmlElement.style.overflow = 'hidden';
		} else if (previousOverflowStyle.current) {
			// When modal is closed, we either have to reapply the style that was before
			rootHtmlElement.style.overflow = previousOverflowStyle.current;
		} else {
			// Or remove it if there was none
			rootHtmlElement.style.removeProperty('overflow');
		}
	}, [eventModal]);

	return (
		<Modal
			onRequestClose={() => setEventModal?.(undefined)}
			preventScroll={true}
			isOpen={!!eventModal}
			className={style.modal}
			overlayClassName={style.overlay}
			parentSelector={() => props.parent}
			appElement={props.parent}
		>
			{event && (
				<div className={style.content}>
					<button
						type="button"
						className={style.closeButton}
						onClick={() => setEventModal?.(undefined)}
						aria-label="modal-close-button"
					>
						<img alt="Close" src={closeIcon} width="16" height="16" />
					</button>
					<iframe
						className={style.iframe}
						src={event.registrationUrl}
						title={event.title}
					></iframe>
				</div>
			)}
		</Modal>
	);
}
