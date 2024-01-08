import style from './Header.module.scss';
import { getConsentCookie, storeConsentCookie } from './services/cookies';
import { Button } from './shared/Button';
import { useState } from 'react';

export function Header() {
	const [decisionMade, decide] = useState(false);

	const storeConsent = (consent: boolean) => {
		storeConsentCookie(consent ? 'yes' : 'no');
		decide(true);
	};

	if (getConsentCookie() || decisionMade) {
		return <></>;
	}
	return (
		<div className={style.header}>
			<div className={style.headerText}>
				<p>
					This calendar can remember which events are selected between sessions.
				</p>
				<p>We do not process this data for any other use.</p>
				<p>Your consent is needed for this functionality.</p>
			</div>
			<div style={{ display: 'flex' }}>
				<Button
					onClick={() => {
						storeConsent(true);
					}}
				>
					Consent
				</Button>
				<Button
					type="ghost"
					onClick={() => {
						storeConsent(false);
					}}
				>
					Don&apos;t consent
				</Button>
			</div>
		</div>
	);
}
