<?php

/**
 * custom option and settings
 */
function cwfc_settings_init()
{
	// Register a new setting for "cwfc" page.
	register_setting('cwfc', 'cwfc_options');

	// Register a new section in the "cwfc" page.
	add_settings_section(
		'cwfc_section_developers',
		__('CogWork filter calendar settings', 'cwfc'),
		'cwfc_section_developers_callback',
		'cwfc'
	);

	// Register new fields in the "cwfc_section_developers" section, inside the "cwfc" page.
	cwfc_add_input_settings_field('Organization', 'ORG');
	cwfc_add_input_settings_field('API Key', 'APIKEY');
	cwfc_add_input_settings_field('Primary color', 'color-primary');
	cwfc_add_input_settings_field('Secondary color', 'color-secondary');
	cwfc_add_input_settings_field('Light color', 'color-light');
	cwfc_add_input_settings_field('Dark color', 'color-dark');
	cwfc_add_input_settings_field('Primary alt color', 'color-primary-alt');
	cwfc_add_input_settings_field('Secondary alt color', 'color-secondary-alt');
}

function cwfc_add_input_settings_field($text, $key, $type = 'text')
{
	return add_settings_field(
		'cwfc_field_' . $key, // As of WP 4.6 this value is used only internally.
		// Use $args' label_for to populate the id inside the callback.
		__($text, 'cwfc'),
		'cwfc_settingfield_cb',
		'cwfc',
		'cwfc_section_developers',
		[
			'label_for' => 'CWFC_' . $key,
			'class' => 'cwfc_row',
			'cwfc_custom_data' => 'custom',
			'type' => $type,
		]
	);
}

/**
 * Register our cwfc_settings_init to the admin_init action hook.
 */
add_action('admin_init', 'cwfc_settings_init');

/**
 * Developers section callback function.
 *
 * @param array $args  The settings array, defining title, id, callback.
 */
function cwfc_section_developers_callback($args)
{
	?>
    <p id="<?php echo esc_attr($args['id']); ?>"></p>
<?php
}

/**
 * WordPress has magic interaction with the following keys: label_for, class.
 * - the "label_for" key value is used for the "for" attribute of the <label>.
 * - the "class" key value is used for the "class" attribute of the <tr> containing the field.
 * Note: you can add custom key value pairs to be used inside your callbacks.
 *
 * @param array $args
 */
function cwfc_settingfield_cb($args)
{
	$defined_constants = get_defined_constants();
	// Get the value of the setting we've registered with register_setting()
	$id = $args['label_for'];
	$type = $args['type'] ?? 'text';
	$options = get_option('cwfc_options');
	$hasOption = $options && array_key_exists($id, $options);
	$value = $hasOption
		? $options[$id]
		: (array_key_exists($id, $defined_constants)
			? $defined_constants[$id]
			: '');
	?>
    <input 
        type="<?php echo esc_attr($type); ?>" 
        id="<?php echo esc_attr($id); ?>" 
        name="cwfc_options[<?php echo esc_attr($id); ?>]" 
        value="<?php echo esc_attr($value); ?>"
    >
<?php
}

/**
 * Add the top level menu page.
 */
function cwfc_options_page()
{
	add_options_page(
		'CogWork filter calendar',
		'CogWork filter calendar',
		'manage_options',
		'cwfc',
		'cwcal_options_page_html'
	);
}

/**
 * Register our cwfc_options_page to the admin_menu action hook.
 */
add_action('admin_menu', 'cwfc_options_page');

/**
 * menu callback function
 */
function cwcal_options_page_html()
{
	// check user capabilities
	if (!current_user_can('manage_options')) {
		return;
	}

	// add error/update messages

	// check if the user have submitted the settings
	// WordPress will add the "settings-updated" $_GET parameter to the url
	if (isset($_GET['settings-updated'])) {
		// add settings saved message with the class of "updated"
		add_settings_error(
			'cwfc_messages',
			'cwfc_message',
			__('Settings Saved', 'cwfc'),
			'updated'
		);
	}

	// show error/update messages
	settings_errors('cwfc_messages');
	?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form action="options.php" method="post">
            <?php
            // output security fields for the registered setting "cwfc"
            settings_fields('cwfc');
            // output setting sections and their fields
            // (sections are registered for "cwfc", each field is registered to a specific section)
            do_settings_sections('cwfc');
            // output save settings button
            submit_button('Save Settings');?>
        </form>
    </div>
<?php
}
