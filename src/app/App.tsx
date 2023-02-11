import appStyle from './App.module.scss';
import { EventSeriesModal } from './EventSeriesModal';
import { Footer } from './Footer';
import { Header } from './Header';
import { Calendar } from './calendar/Calendar';
import { EventSelection } from './event-selection/EventSelection';
import { StateWrapper } from './store/StateWrapper';
import WCJ from './types/wcj';
import { useEffect, useRef } from 'react';

type Props = WCJ.Context & { colors: Record<string, string> };

export default function App(props: Props) {
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = rootRef.current;
		if (root) {
			for (const color in props.colors) {
				const colorVal = props.colors[color];
				root.style.setProperty(`--cw-color-${color}`, colorVal);
			}
		}
	}, [props.colors]);

	return (
		<StateWrapper categories={props.categories} events={props.events}>
			<div id="cw-filter-calendar-root" className={appStyle.root} ref={rootRef}>
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
			</div>
			<EventSeriesModal />
		</StateWrapper>
	);
}
