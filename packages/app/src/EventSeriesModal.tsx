import style from './EventSeriesModal.module.scss';
import closeIcon from './assets/close.svg';
import Modal from 'react-modal';
import { Event } from './types/wcj';

type Props = {
	parent: HTMLElement;
	event: Event | undefined;
	close: () => void;
};

export function EventSeriesModal(props: Props) {
	return (
		<Modal
			onRequestClose={props.close}
			preventScroll={true}
			isOpen={!!props.event}
			className={style.modal}
			overlayClassName={style.overlay}
			parentSelector={() => props.parent}
			appElement={props.parent}
			bodyOpenClassName="cwfc-modal-open"
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
