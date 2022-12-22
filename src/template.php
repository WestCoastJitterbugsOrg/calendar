<?php


/** Enqueue scripts */

if (!function_exists('get_plugin_data')) {
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
}
$plugin_data = get_plugin_data(dirname(__FILE__) . '/../cw-filter-calendar.php');
$js_to_load  = plugin_dir_url(__FILE__) . 'index.js';

wp_register_script('cwfc-script', $js_to_load, [], $plugin_data["Version"], true);
wp_register_style('cwfc-style', '', [], $plugin_data["Version"], true);

require_once(dirname(__FILE__) . '/cwfc-fetch.php');

$result = cwfc_get_events();

if (is_wp_error($result)) {
    wp_add_inline_script(
        'cwfc-script',
        'window[\'cw_error\'] = ' . json_encode($result),
        'before'
    );

    return;
}
wp_add_inline_script(
    'cwfc-script',
    'window[\'cw_data\'] = ' . json_encode($result),
    'before'
);


$options = get_option('cwfc_options');

wp_add_inline_style(
    "cwfc-style",
    ":root {\r\n" .
        ($options['cwfc_field_color-primary'] ? '--cw-color-primary: ' . $options['cwfc_field_color-primary'] . ";\n" : '') .
        ($options['cwfc_field_color-secondary'] ? '--cw-color-secondary: ' . $options['cwfc_field_color-secondary'] . ";\n" : '') .
        ($options['cwfc_field_color-dark'] ? '--cw-color-dark: ' . $options['cwfc_field_color-dark'] . ";\n" : '') .
        ($options['cwfc_field_color-light'] ? '--cw-color-light: ' . $options['cwfc_field_color-light'] . ";\n" : '') .
        ($options['cwfc_field_color-primary-alt'] ? '--cw-color-primary-alt: ' . $options['cwfc_field_color-primary-alt'] . ";\n" : '') .
        ($options['cwfc_field_color-secondary-alt'] ? '--cw-color-secondary-alt: ' . $options['cwfc_field_color-secondary-alt'] : '') .
        "\r\n}"
);


/** Load scripts */

/**
 * You can pass in here some data which if you need to have some settings/localization etc for your App,
 * so you'll be able for example generate initial state of your app, based on some settings provided by WordPress.
 */
$defaultSettings = [
    "width"    => '100%'
];

$settings = $defaultSettings;

extract(shortcode_atts(
    $defaultSettings,
    $attributes,
    'cwfc'
));

wp_enqueue_script('cwfc-script');
wp_enqueue_style('cwfc-style');

return '<div id="cwfc" data-cwfc-settings="' . esc_attr(wp_json_encode($settings)) . '" class="alignwide"></div>';
