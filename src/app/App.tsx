import appStyle from './App.module.scss';
import { Footer } from './Footer';
import { Header } from './Header';
import { Calendar } from './calendar/Calendar';
import { EventSelection } from './event-selection/EventSelection';
import { EventSeriesModal } from './shared/EventModal/EventSeriesModal';
import { StateWrapper } from './store/StateWrapper';
import WCJ from './types/wcj';

type Props = WCJ.Context;

export default function App({ categories, events }: Props) {
	return (
		<StateWrapper categories={categories} events={events}>
			<div id="cw-filter-calendar-root" className={appStyle.root}>
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
