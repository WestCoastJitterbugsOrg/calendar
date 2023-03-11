import appStyle from './App.module.scss';
import { EventSeriesModal } from './EventSeriesModal';
import { Footer } from './Footer';
import { Header } from './Header';
import { Calendar } from './calendar/Calendar';
import { EventSelection } from './event-selection/EventSelection';
import { StateWrapper } from './store/StateWrapper';
import { useEffect } from 'react';
import WCJ from 'shared/types';

type Props = WCJ.Context & {
	colors: Record<string, string>;
	parent: HTMLElement;
};

export function App(props: Props) {
	useEffect(() => {
		for (const color in props.colors) {
			const colorVal = props.colors[color];
			props.parent.style.setProperty(`--cw-color-${color}`, colorVal);
		}
	}, [props.colors, props.parent]);

	return (
		<StateWrapper categories={props.categories} events={props.events}>
			<Header />
			<div className={appStyle.contentWrapper}>
				<aside className={appStyle.eventSelection}>
					<EventSelection />
				</aside>
				<main className={appStyle.calendar}>
					<Calendar />
				</main>
			</div>
			<Footer />
			<EventSeriesModal parent={props.parent} />
		</StateWrapper>
	);
}
