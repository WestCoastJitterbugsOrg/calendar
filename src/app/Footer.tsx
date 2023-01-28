/* eslint-disable jsx-a11y/alt-text */
import { useContext } from 'react';
import fileDownload from './assets/file-download.svg';
import githubLogo from './assets/github-logo.png';
import { exportICS } from './services/ics';
import { Button } from './shared/Buttons/Button';
import { stateContext } from './store/StateWrapper';
import { default as footerStyle } from './Footer.module.scss';

export function Footer() {
	const { events } = useContext(stateContext);

	return (
		<footer className={footerStyle.footer}>
			<div className={footerStyle.downloadIcsButton} data-testid="download-ics-button">
				<Button onClick={() => void exportICS(events)}>
					Export iCal <img src={fileDownload} className={footerStyle.downloadIcsImg} />
				</Button>
			</div>
			<a
				className={footerStyle.githubWrapper}
				href="https://github.com/WestCoastJitterbugsOrg/Personalized-Calendar"
			>
				<span className={footerStyle.githubText}>
					Help with development or report an issue
				</span>
				<img src={githubLogo} className={footerStyle.githubLogo}></img>
			</a>
		</footer>
	);
}
