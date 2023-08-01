import metadata from './block.json';
import { mockContext } from './editMockData';
import { App } from '@cwfc/app/src/App';
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
import { Fragment, useState } from 'react';

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
		const props = useBlockProps();
		return (
			<div {...props}>
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
											enableAlpha={false}
											color={Colors[color]}
											onChange={(newColor) =>
												setAttributes({
													Colors: { ...Colors, [color]: newColor },
												})
											}
										/>
									</PanelRow>
								</Fragment>
							))}
						</PanelBody>
					</Panel>
				</InspectorControls>
				CogWork calendar dummy
			</div>
		);
	},
});
