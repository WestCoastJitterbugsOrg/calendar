import './index.scss';
import AppInit from './AppInit';
import { WpCwfc } from '@cwfc/shared';
import { createRoot } from 'react-dom/client';

// Exported function to be used externally (ie from the wordpress plugin)
export function render(data: WpCwfc, container: Element) {
	createRoot(container).render(<AppInit {...data} />);
}
