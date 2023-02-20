import metadata from './block.json';
import { mockContext } from './editMockData';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import {
	TextControl,
	Panel,
	PanelBody,
	PanelRow,
	ColorPicker,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import App from 'app/App';
import { Fragment } from 'react';

type Attributes = {
	Organization: string;
	Password: string;
	Colors: Record<string, string>;
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata as BlockConfiguration<Attributes>, {
	edit: function Edit({
		attributes: { Organization, Password, Colors },
		setAttributes,
	}) {
		return (
			<div {...useBlockProps()}>
				<InspectorControls key="setting">
					<Panel>
						<PanelBody title="Basics" initialOpen={true}>
							<PanelRow>
								<TextControl
									value={Organization}
									label={__('Organization', 'cw-filter-calendar')}
									onChange={(org) => setAttributes({ Organization: org })}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									value={Password}
									label={__('Password', 'cw-filter-calendar')}
									type="password"
									onChange={(pw) => setAttributes({ Password: pw })}
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody title="Colors" initialOpen={false}>
							{Object.keys(Colors).map((color) => (
								<Fragment key={color}>
									<strong>{color}</strong>
									<PanelRow key={color}>
										<ColorPicker
											disableAlpha={true}
											color={Colors[color]}
											onChangeComplete={(newColor) =>
												setAttributes({
													Colors: { ...Colors, [color]: newColor.hex },
												})
											}
										/>
									</PanelRow>
								</Fragment>
							))}
						</PanelBody>
					</Panel>
				</InspectorControls>
				<App {...mockContext} colors={Colors} />
			</div>
		);
	},
});
