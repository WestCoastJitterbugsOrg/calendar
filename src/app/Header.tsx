import style from './Header.module.scss';
import { canStoreSelection, storeConsentCookie } from './services/cookies';
import { Button } from './shared/Buttons/Button';
import { useState } from 'react';

export function Header() {
	const [accepted, accept] = useState(false);

	const consent = () => {
		storeConsentCookie();
		accept(true);
	};

	if (canStoreSelection() || accepted) {
		return <></>;
	}
	return (
		<header data-testid="cookie-header" className={style.header}>
			<div className={style.headerText}>
				<p>
					This calendar can remember which events are selected between sessions.
				</p>
				<p>We do not process this data for any other use.</p>
				<p>Your consent is needed for this functionality.</p>
			</div>
			<Button onClick={consent}>Consent</Button>
		</header>
	);
}
