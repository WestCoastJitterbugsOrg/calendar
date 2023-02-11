import metadata from './block.json';
import { mockContext } from './editMockData';
import App from '@app/App';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

type Attributes = {
	Organization: string;
	Password: string;
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata as BlockConfiguration<Attributes>, {
	edit: function Edit({
		attributes: { Organization, Password },
		setAttributes,
	}) {
		return (
			<div {...useBlockProps()}>
				<InspectorControls key="setting">
					<div id="cwfc-controls">
						<fieldset>
							<legend className="blocks-base-control__label">
								{__('Organization', 'cw-filter-calendar')}
							</legend>
							<TextControl
								value={Organization}
								onChange={(org) => setAttributes({ Organization: org })}
							/>
						</fieldset>

						<fieldset>
							<legend className="blocks-base-control__label">
								{__('Password', 'cw-filter-calendar')}
							</legend>
							<TextControl
								value={Password}
								type="password"
								onChange={(pw) => setAttributes({ Password: pw })}
							/>
						</fieldset>
					</div>
				</InspectorControls>
				<App {...mockContext} />
			</div>
		);
	},
});
