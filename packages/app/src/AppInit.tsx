import { App } from './App';
import style from './AppInit.module.scss';
import { initContext } from './services/cogwork';
import { ErrorViewer } from './shared/ErrorViewer';
import Loader from './shared/Loader';
import { useState } from 'react';
import type { WpCwfc } from 'shared/types';
import useSwr from 'swr';
import type { CW } from 'types';
import type { MaybeArray } from 'types/utils';

type Props = WpCwfc;

export default function AppInit(props: Props) {
	const formData = new FormData();
	formData.append('action', 'cwfc_fetch');
	formData.append('org', props.org);
	formData.append('pw_hash', props.pwHash);

	const [rootRef, setRef] = useState<HTMLElement | null>(null);

	const { isLoading, error, data } = useSwr<MaybeArray<CW.Event>, string>(
		'cwfc_fetch',
		() =>
			fetch(props.ajaxUrl, {
				method: 'POST',
				body: formData,
			}).then((res) =>
				res.ok ? res.json() : res.text().then((text) => Promise.reject(text))
			),
		{
			loadingTimeout: 10000,
		}
	);

	const getContent = () => {
		if (isLoading) {
			return <Loader />;
		}

		if (error) {
			return <ErrorViewer message={JSON.stringify(error, null, 4)} />;
		}

		if (!data) {
			return <h3>Didn&apos;t get any data</h3>;
		}

		if (rootRef)
			return (
				<App {...initContext(data)} colors={props.colors} parent={rootRef} />
			);
		return <></>;
	};

	return (
		<div className={style.root} ref={setRef}>
			{getContent()}
		</div>
	);
}
