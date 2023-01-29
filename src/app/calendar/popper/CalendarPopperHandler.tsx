import { stateContext } from '../../store/StateWrapper';
import { EventApi, EventClickArg } from '@fullcalendar/core';
import { createPopper, Instance } from '@popperjs/core';
import { useContext, useRef } from 'react';
import { render } from 'react-dom';
import { TooltipComponent } from './CalendarPopper';

const highlightClass = ['bg-primary-alt'];

export function usePopperHandler() {
	const popper = useRef<Instance>();
	const { setEventModal } = useContext(stateContext);

	const root = document.body;
	let tooltipWrapper: HTMLElement | null;
	let popperIsActive = false;

	function createTooltip(event: EventApi, target: HTMLElement) {
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
			popper.current = createPopper(
				target,
				tooltipWrapper.firstElementChild,
				{
					placement: 'bottom',
					strategy: 'absolute',
				}
			);
			popperIsActive = true;
		});
	}

	function removePopper() {
		const element = getPopperInstance();
		if (!element) {
			return;
		}
		element.firstElementChild?.classList.remove(...highlightClass);
		if (popper.current) {
			popper.current.destroy();
			popper.current.forceUpdate();
		}
		document.removeEventListener('click', removePopper);
		popperIsActive = false;
	}

	function getPopperInstance() {
		if (!popper.current?.state) {
			return;
		}
		const elements = popper.current.state.elements;
		return elements.reference as HTMLElement;
	}

	function handleEventClick(fc: EventClickArg) {
		fc.jsEvent.stopPropagation();
		if (fc.el) {
			if (!popperIsActive || getPopperInstance() !== fc.el) {
				removePopper();
				createTooltip(fc.event, fc.el);
				document.addEventListener('click', removePopper);
			} else {
				removePopper();
			}
		}
	}

	return { removePopper, handleEventClick };
}
