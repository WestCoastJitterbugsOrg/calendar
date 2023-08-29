import { stateContext } from '../../store/StateWrapper';
import { CalendarTooltip } from './CalendarTooltip';
import { EventApi, EventClickArg } from '@fullcalendar/core';
import { createPopper, Instance } from '@popperjs/core';
import { RefObject, useContext, useRef } from 'react';
import { createRoot } from 'react-dom/client';

export function useTooltip(refObj: RefObject<HTMLElement>) {
	const popper = useRef<Instance>();
	const { setEventModal } = useContext(stateContext);

	let tooltipWrapper: HTMLElement | null;
	let popperIsActive = false;

	const createTooltip = (event: EventApi, target: HTMLElement) => {
		if (tooltipWrapper == null) {
			tooltipWrapper = document.createElement('div');
		}
		tooltipWrapper.style.zIndex = '1';

		const root = refObj.current ?? document;

		if (!root.contains(tooltipWrapper)) {
			root.appendChild(tooltipWrapper);
		}

		createRoot(tooltipWrapper).render(
			<CalendarTooltip
				event={event}
				openModal={() => setEventModal?.(event.extendedProps.id as string)}
			/>,
		);
		setTimeout(() => {
			if (!(tooltipWrapper?.firstElementChild instanceof HTMLElement)) {
				return;
			}
			popper.current = createPopper(target, tooltipWrapper, {
				placement: 'bottom',
				strategy: 'absolute',
				modifiers: [
					{
						data: {},
					},
				],
			});

			popperIsActive = true;
		});
	};

	const removeTooltip = () => {
		const element = getPopperInstance();
		if (!element) {
			return;
		}
		tooltipWrapper?.remove();
		if (popper.current) {
			popper.current.destroy();
			popper.current.forceUpdate();
		}
		document.removeEventListener('click', removeTooltip);
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
			removeTooltip();
			createTooltip(fc.event, fc.el);
			document.addEventListener('click', removeTooltip, {
				once: true,
			});
		} else {
			removeTooltip();
		}
	};

	return { handleEventClick };
}
