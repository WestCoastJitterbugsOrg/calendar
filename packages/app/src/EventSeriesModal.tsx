import style from './EventSeriesModal.module.scss';
import closeIcon from './assets/close.svg';
import { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Event } from './types/wcj';

type Props = {
	parent: HTMLElement;
	event: Event | undefined;
	close: () => void;
};

const rootHtmlElement = document.documentElement;

export function EventSeriesModal(props: Props) {
	const previousOverflowStyle = useRef<string>();
	useEffect(() => {
		// Code to prevent scrolling events getting triggered on the main page:
		if (props.event) {
			previousOverflowStyle.current = rootHtmlElement.style.overflow;
			rootHtmlElement.style.overflow = 'hidden';
		} else if (previousOverflowStyle.current) {
			// When modal is closed, we either have to reapply the style that was before
			rootHtmlElement.style.overflow = previousOverflowStyle.current;
		} else {
			// Or remove it if there was none
			rootHtmlElement.style.removeProperty('overflow');
		}
	}, [props.event]);

	return (
		<Modal
			onRequestClose={props.close}
			preventScroll={true}
			isOpen={!!props.event}
			className={style.modal}
			overlayClassName={style.overlay}
			parentSelector={() => props.parent}
			appElement={props.parent}
		>
			{props.event && (
				<div className={style.content}>
					<button
						type="button"
						className={style.closeButton}
						onClick={props.close}
						aria-label="modal-close-button"
					>
						<img alt="Close" src={closeIcon} width="16" height="16" />
					</button>
					<iframe
						className={style.iframe}
						src={props.event.registrationUrl}
						title={props.event.title}
					></iframe>
				</div>
			)}
		</Modal>
	);
}
