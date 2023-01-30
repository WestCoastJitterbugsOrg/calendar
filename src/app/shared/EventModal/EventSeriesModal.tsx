import { appContainer } from '../../../app-container';
import { stateContext } from '../../store/StateWrapper';
import { useContext, useEffect, useRef } from 'react';
import * as Modal from 'react-modal';
import { EventSeriesModalContent } from './EventModalContent';
import { default as style } from './EventSeriesModal.module.scss';

type Props = {
	parent?: HTMLElement;
};

const rootHtmlElement = document.documentElement;

export function EventSeriesModal(props: Props) {
	const { eventModal, setEventModal } = useContext(stateContext);
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
			parentSelector={() => props.parent ?? appContainer}
			appElement={props.parent ?? appContainer}
		>
			{eventModal && <EventSeriesModalContent eventId={eventModal} />}
		</Modal>
	);
}
