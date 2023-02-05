import { stateContext } from '../../store/StateWrapper';
import { TooltipComponent } from './CalendarPopper';
import { EventApi, EventClickArg } from '@fullcalendar/core';
import { createPopper, Instance } from '@popperjs/core';
import { useContext, useRef } from 'react';
import { render } from 'react-dom';

const highlightClass = ['bg-primary-alt'];

export function usePopperHandler() {
	const popper = useRef<Instance>();
	const { setEventModal } = useContext(stateContext);

	const root = document.querySelector('#cwfc-container') ?? document;
	let tooltipWrapper: HTMLElement | null;
	let popperIsActive = false;

	const createTooltip = (event: EventApi, target: HTMLElement) => {
		if (tooltipWrapper == null) {
			tooltipWrapper = document.createElement('div');
		}
		if (!root.contains(tooltipWrapper)) {
			root.appendChild(tooltipWrapper);
		}

		render(
			<TooltipComponent
				event={event}
				openModal={() => setEventModal?.(event.extendedProps.id as string)}
			/>,
			tooltipWrapper
		);

		target.firstElementChild?.classList.add(...highlightClass);

		setTimeout(() => {
			if (!(tooltipWrapper?.firstElementChild instanceof HTMLElement)) {
				return;
			}
			popper.current = createPopper(target, tooltipWrapper.firstElementChild, {
				placement: 'bottom',
				strategy: 'absolute',
			});
			popperIsActive = true;
		});
	};

	const removePopper = () => {
		const element = getPopperInstance();
		if (!element) {
			return;
		}
		element.firstElementChild?.classList.remove(...highlightClass);
		tooltipWrapper?.remove();
		if (popper.current) {
			popper.current.destroy();
			popper.current.forceUpdate();
		}
		document.removeEventListener('click', removePopper);
		popperIsActive = false;
	};

	const getPopperInstance = () => {
		if (!popper.current?.state) {
			return;
		}
		const elements = popper.current.state.elements;
		return elements.reference as HTMLElement;
	};

	const handleEventClick = (fc: EventClickArg) => {
		fc.jsEvent.stopPropagation();
		if (!popperIsActive || getPopperInstance() !== fc.el) {
			removePopper();
			createTooltip(fc.event, fc.el);
			document.addEventListener('click', removePopper);
		} else {
			removePopper();
		}
	};

	return { removePopper, handleEventClick };
}
