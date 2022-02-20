<?php

/**
 * custom option and settings
 */
function wcjcal_settings_init()
{
    // Register a new setting for "wcjcal" page.
    register_setting('wcjcal', 'wcjcal_options');

    // Register a new section in the "wcjcal" page.
    add_settings_section(
        'wcjcal_section_developers',
        __('This is just a mocked up page for now', 'wcjcal'),
        'wcjcal_section_developers_callback',
        'wcjcal'
    );

    // Register a new field in the "wcjcal_section_developers" section, inside the "wcjcal" page.
    add_settings_field(
        'wcjcal_field_apikey', // As of WP 4.6 this value is used only internally.
        // Use $args' label_for to populate the id inside the callback.
        __('API Key', 'wcjcal'),
        'wcjcal_apikey_cb',
        'wcjcal',
        'wcjcal_section_developers',
        array(
            'wcjcal_custom_data' => 'custom',
        )
    );
}

/**
 * Register our wcjcal_settings_init to the admin_init action hook.
 */
add_action('admin_init', 'wcjcal_settings_init');

/**
 * Developers section callback function.
 *
 * @param array $args  The settings array, defining title, id, callback.
 */
function wcjcal_section_developers_callback($args)
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
function wcjcal_apikey_cb($args)
{
    // Get the value of the setting we've registered with register_setting()
    $options = get_option('wcjcal_options');
?>
    <input type="text" id="apikey" name="apikey">
<?php
}

/**
 * Add the top level menu page.
 */
function wcjcal_options_page()
{
    add_options_page(
        'Cogwork Calendar',
        'Cogwork Calendar',
        'manage_options',
        'wcjcal',
        'cwcal_options_page_html'
    );
}


/**
 * Register our wcjcal_options_page to the admin_menu action hook.
 */
add_action('admin_menu', 'wcjcal_options_page');


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
        add_settings_error('wcjcal_messages', 'wcjcal_message', __('Settings Saved', 'wcjcal'), 'updated');
    }

    // show error/update messages
    settings_errors('wcjcal_messages');
?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form action="options.php" method="post">
            <?php
            // output security fields for the registered setting "wcjcal"
            settings_fields('wcjcal');
            // output setting sections and their fields
            // (sections are registered for "wcjcal", each field is registered to a specific section)
            do_settings_sections('wcjcal');
            // output save settings button
            submit_button('Save Settings');
            ?>
        </form>
    </div>
<?php
}
