/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import metadata from './block.json';

/**
 * Internal dependencies
 */
import edit from './edit';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata, {
	edit,
	icon: 'calendar-alt',
	attributes: {},
});
