import appStyle from './App.module.scss';
import { EventSeriesModal } from './EventSeriesModal';
import { Footer } from './Footer';
import { Header } from './Header';
import { Calendar } from './calendar/Calendar';
import { EventSelection } from './event-selection/EventSelection';
import { StateWrapper } from './store/StateWrapper';
import { useEffect, useState } from 'react';
import type { WCJ } from 'types';

type Props = WCJ.Context & { colors: Record<string, string> };

export default function App(props: Props) {
	const [rootRef, setRef] = useState<HTMLElement | null>(null);
	useEffect(() => {
		for (const color in props.colors) {
			const colorVal = props.colors[color];
			rootRef?.style.setProperty(`--cw-color-${color}`, colorVal);
		}
	}, [props.colors, rootRef]);

	return (
		<StateWrapper categories={props.categories} events={props.events}>
			<div id="cw-filter-calendar-root" className={appStyle.root} ref={setRef}>
				<Header />
				<div className={appStyle.contentWrapper}>
					<aside className={appStyle.eventSelection}>
						<EventSelection />
					</aside>
					<main className={appStyle.calendar} data-testid="calendar-wrapper">
						<Calendar />
					</main>
				</div>
				<Footer />
				{rootRef && <EventSeriesModal parent={rootRef} />}
			</div>
		</StateWrapper>
	);
}
