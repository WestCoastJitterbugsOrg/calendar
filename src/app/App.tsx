import { initContext } from './services/cogwork';

type AppProps = {
	data: ReturnType<typeof initContext>;
};

export default function App(props: AppProps) {
	return <div>{props.data?.categories}</div>;
}
