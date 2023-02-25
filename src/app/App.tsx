import appStyle from './App.module.scss';
import { EventSeriesModal } from './EventSeriesModal';
import { Footer } from './Footer';
import { Header } from './Header';
import { Calendar } from './calendar/Calendar';
import { EventSelection } from './event-selection/EventSelection';
import { StateWrapper } from './store/StateWrapper';
import { WCJ } from 'types';

type Props = WCJ.Context & {
	colors: Record<string, string>;
	parent: HTMLElement;
};

export function App(props: Props) {
	return (
		<StateWrapper categories={props.categories} events={props.events}>
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
			<EventSeriesModal parent={props.parent} />
		</StateWrapper>
	);
}
