import { App } from './App';
import style from './AppInit.module.scss';
import { initContext } from './services/cogwork';
import { ErrorViewer } from './shared/ErrorViewer';
import Loader from './shared/Loader';
import type { CW } from './types';
import type { MaybeArray } from './types/utils';
import type { WpCwfc } from '@cwfc/shared';
import { useState } from 'react';
import useSwr from 'swr';

type Props = WpCwfc;

export default function AppInit(props: Props) {
	const formData = new FormData();
	formData.append('action', 'cwfc_fetch');
	formData.append('org', props.org);
	formData.append('pw_hash', props.pwHash);

	const [rootRef, setRef] = useState<HTMLElement | null>(null);

	const { isLoading, error, data } = useSwr<MaybeArray<CW.Event>, string>(
		'cwfc_fetch',
		async () => {
			const res = await fetch(props.ajaxUrl, {
				method: 'POST',
				body: formData,
				cache: 'force-cache',
			});

			if (res.ok) {
				return res.json();
			}
			const text = await res.text();
			return Promise.reject(text);
		},

		{
			loadingTimeout: 10000,
		},
	);

	let content = <></>;
	if (isLoading) {
		content = <Loader />;
	} else if (error) {
		content = <ErrorViewer message={JSON.stringify(error, null, 4)} />;
	} else if (!data) {
		content = <h3>Didn&apos;t get any data</h3>;
	} else if (rootRef) {
		content = (
			<App {...initContext(data)} colors={props.colors} parent={rootRef} />
		);
	}

	return (
		<div className={style.root} ref={setRef}>
			{content}
		</div>
	);
}
