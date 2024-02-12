import metadata from './block.json';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import {
	TextControl,
	Panel,
	PanelBody,
	PanelRow,
	ColorPicker,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from 'react';
import { render } from './render';

declare const wp: {
	ajax: {
		post<T>(action: string, data: Record<string, unknown>): Promise<T>;
	};
};

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
		const defaultColors: Record<string, string> =
			metadata.attributes.Colors.default;
		const props = useBlockProps();
		const [element, setElement] = useState<HTMLDivElement>();
		const load = (el: HTMLDivElement) => {
			setElement(() => el);
		};

		useEffect(() => {
			if (element) {
				void wp.ajax
					.post<string>('cwfc_get_pw_hash', { pw: Password })
					.then((pwHash) => {
						element.innerHTML = '';
						render(element, {
							ajaxUrl: '/wp-admin/admin-ajax.php',
							colors: Colors,
							org: Organization,
							pwHash,
						});
					});
			}
		}, [Colors, Organization, Password, element]);

		return (
			<div {...props}>
				<InspectorControls key="setting">
					<Panel>
						<PanelBody title="Basics" initialOpen={true}>
							<PanelRow>
								<TextControl
									value={Organization}
									label={__('Organization', 'cw-filter-calendar')}
									onChange={(org) => {
										setAttributes({ Organization: org });
									}}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									value={Password}
									label={__('Password', 'cw-filter-calendar')}
									type="password"
									onChange={(pw) => {
										setAttributes({ Password: pw });
									}}
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
											onChange={(newColor) => {
												setAttributes({
													Colors: { ...Colors, [color]: newColor },
												});
											}}
										/>
									</PanelRow>
									<Button
										variant="secondary"
										onClick={() => {
											setAttributes({
												Colors: { ...Colors, [color]: defaultColors[color] },
											});
										}}
									>
										Reset
									</Button>
									<hr />
								</Fragment>
							))}
						</PanelBody>
					</Panel>
				</InspectorControls>
				<div ref={load}></div>
			</div>
		);
	},
});
