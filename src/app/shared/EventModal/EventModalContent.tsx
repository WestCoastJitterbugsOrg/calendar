/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import closeIcon from '../../assets/close.svg';
import { stateContext } from '../../store/StateWrapper';
import { useContext } from 'react';
import style from './EventSeriesModal.module.scss';

type Props = {
	eventId: string;
};

export function EventSeriesModalContent(props: Props) {
	const { events, setEventModal } = useContext(stateContext);
	const event = events[props.eventId];

	return (
		<div className={style.content} data-testid="event-series-modal-content">
			<div
				className={style.closeButton}
				onClick={() => setEventModal?.(undefined)}
				data-testid="modal-close-button"
			>
				<img src={closeIcon} width="16" height="16" />
			</div>
			<iframe
				className={style.iframe}
				src={event.registrationUrl + '&layout=calendar'}
				title={event.title}
			></iframe>
		</div>
	);
}
