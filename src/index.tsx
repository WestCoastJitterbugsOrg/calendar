import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { appContainer, appTag } from "./app-container";
const App = lazy(() => import("./App"));

try {
	const wcjCalElement = document.getElementById("wcjcal");

	if (wcjCalElement == null) {
		throw Error("Could not find #wcjcal element in DOM");
	} else {
		const shadowRoot = wcjCalElement.attachShadow({ mode: "open" });
		shadowRoot.appendChild(appContainer);
		const root = createRoot(appTag);

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

// WORDPRESS GENERATED

// /**
//  * Registers a new block provided a unique name and an object defining its behavior.
//  *
//  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
//  */
//  import { registerBlockType } from '@wordpress/blocks';

//  /**
//   * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
//   * All files containing `style` keyword are bundled together. The code used
//   * gets applied both to the front of your site and to the editor.
//   *
//   * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
//   */
//  import './style.scss';

//  /**
//   * Internal dependencies
//   */
//  import Edit from './edit';
//  import save from './save';
//  import metadata from './block.json';

//  /**
//   * Every block starts by registering a new block type definition.
//   *
//   * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
//   */
//  registerBlockType( metadata.name, {
//    /**
//     * @see ./edit.js
//     */
//    edit: Edit,

//    /**
//     * @see ./save.js
//     */
//    save,
//    attributes: [],
//    category: '',
//    title: ''
//  } );
