import { initContext } from './services/cogwork';

type AppProps = {
	data: ReturnType<typeof initContext>;
};

export default function App(props: AppProps) {
	return <div>{Object.values(props.data.categories).map((cat) => cat.id)}</div>;
}
