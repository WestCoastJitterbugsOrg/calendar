import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
const App = lazy(() => import("./App"));

try {
	const wcjCalElement = document.getElementById("wcjcal");

	if (wcjCalElement == null) {
		throw Error("Could not find #wcjcal element in DOM");
	} else {
		const root = createRoot(wcjCalElement);

		root.render(
			<StrictMode>
				<Suspense fallback={<SpinLoader />}>
					<App />
				</Suspense>
			</StrictMode>
		);
	}
} catch (error) {
	// eslint-disable-next-line no-console
	console.error(
		`
  An error occured in WCJ Calendar!
  Please contact it@wcj.se with the error message:
  `,
		error
	);
}
function SpinLoader() {
	return (
		<div className="flex h-screen items-center justify-center bg-light">
			<div className="h-16 w-16 animate-spin rounded-[50%] border-8 border-solid border-t-primary-alt border-r-secondary border-b-primary border-l-secondary-alt"></div>
		</div>
	);
}
