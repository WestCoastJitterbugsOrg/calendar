import style from './Footer.module.scss';
import fileDownload from './assets/file-download.svg';
import githubLogo from './assets/github-logo.png';
import { exportICS } from './services/ics';
import { Button } from './shared/Button';
import { stateContext } from './state';
import { useContext } from 'react';

export function Footer() {
	const { events, checkedEvents } = useContext(stateContext);

	return (
		<div className={style.footer}>
			<div className={style.exportIcsButton}>
				<Button
					onClick={() =>
						void exportICS(
							events.filter((event) => checkedEvents.includes(event.id)),
						)
					}
				>
					Exportera iCal{' '}
					<img
						alt="export icon"
						src={fileDownload}
						className={style.exportIcsImg}
					/>
				</Button>
			</div>
			<a
				className={style.githubWrapper}
				href="https://github.com/WestCoastJitterbugsOrg/Personalized-Calendar"
			>
				<span className={style.githubText}>
					Hjälp till med utveckling eller rapportera problem
				</span>
				<img
					alt="GitHub logo"
					src={githubLogo}
					className={style.githubLogo}
				></img>
			</a>
		</div>
	);
}
