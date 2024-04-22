import { App } from './App';
import style from './AppInit.module.scss';
import { initContext } from './services/cogwork';
import { ErrorViewer } from './shared/ErrorViewer';
import { Loader } from './shared/Loader';
import { CW } from './types';
import { MaybeArray } from './types/utils';
import { WpCwfc } from '@cwfc/shared';
import { useEffect, useState } from 'react';
import useSwr from 'swr';

type Props = WpCwfc;

export default function AppInit(props: Props) {
	const [rootRef, setRef] = useState<HTMLElement | null>(null);

	return (
		<div className={style.root} ref={setRef}>
			<AppContent {...props} rootRef={rootRef} />
		</div>
	);
}

function AppContent(props: Props & { rootRef: HTMLElement | null }) {
	useEffect(() => {
		for (const color in props.colors) {
			const colorVal = props.colors[color];
			props.rootRef?.style.setProperty(`--cw-color-${color}`, colorVal);
		}
	}, [props.colors, props.rootRef]);

	const formData = new FormData();
	formData.append('action', 'cwfc_fetch');
	formData.append('org', props.org);
	formData.append('pw_hash', props.pwHash);

	const swrResponse = useSwr<MaybeArray<CW.Event>, string>(
		'cwfc_fetch',
		async () => {
			const res = await fetch(props.ajaxUrl, {
				method: 'POST',
				body: formData,
			});

			if (res.ok) {
				return res.json();
			}
			const text = await res.text();
			return Promise.reject(new Error(text));
		},
		{
			loadingTimeout: 10000,
		},
	);

	const { isLoading, error, data, isValidating } = swrResponse;

	if (isLoading) {
		return <Loader />;
	} else if (error && !data) {
		const message = JSON.stringify(error, null, 4);
		return <ErrorViewer message={message} />;
	} else if (!data) {
		return <h3>Didn&apos;t get any data</h3>;
	} else if (props.rootRef) {
		const { events, categories, selectedEventIds } = initContext(data);
		return (
			<App
				events={events}
				categories={categories}
				selectedEventIds={selectedEventIds}
				parent={props.rootRef}
				isLoading={isValidating}
			/>
		);
	}

	return <></>;
}
