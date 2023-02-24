import { App } from './App';
import { initContext } from './services/cogwork';
import useSwr from 'swr';
import { CW } from 'types';
import { MaybeArray } from 'types/utils';
import { WpCwfc } from 'types/wcj';

type Props = WpCwfc;

export default function AppInit(props: Props) {
	const formData = new FormData();
	formData.append('action', 'cwfc_fetch');
	formData.append('org', props.org);
	formData.append('pw_hash', props.pwHash);

	const { isLoading, error, data } = useSwr<MaybeArray<CW.Event>, string>(
		'cwfc_fetch',
		() =>
			fetch(props.ajaxUrl, {
				method: 'POST',
				body: formData,
			}).then((res) =>
				res.ok ? res.json() : res.text().then((text) => Promise.reject(text))
			)
	);

	if (isLoading) {
		return <>Loading...</>;
	}

	if (error) {
		return (
			<>
				<h3>An error has occurred</h3>
				<pre style={{ whiteSpace: 'break-spaces' }}>
					{JSON.stringify(error)}
				</pre>
			</>
		);
	}

	if (!data) {
		return <h3>Didn&apos;t get any data</h3>;
	}

	const context = initContext(data);

	return <App {...context} colors={props.colors} />;
}
