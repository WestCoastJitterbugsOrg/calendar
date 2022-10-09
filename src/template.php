<?php


/** Enqueue scripts */

if (!function_exists('get_plugin_data')) {
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
}
$plugin_data = get_plugin_data(dirname(__FILE__) . '/wcj-calendar.php');
$js_to_load  = plugin_dir_url(__FILE__) . 'wcjcal.js';

wp_register_script('wcjcal-script', $js_to_load, [], $plugin_data["Version"], true);
wp_register_style('wcjcal-style', '', [], $plugin_data["Version"], true);

$result = wcjcal_get_events();

if (is_wp_error($result)) {
    wp_add_inline_script(
        'wcjcal-script',
        'window[\'cw_error\'] = ' . json_encode($result),
        'before'
    );

    return;
}
wp_add_inline_script(
    'wcjcal-script',
    'window[\'cw_data\'] = ' . json_encode($result),
    'before'
);


$options = get_option('wcjcal_options');

wp_add_inline_style(
    "wcjcal-style",
    ":root {\r\n" .
        ($options['wcjcal_field_color-primary'] ? '--cw-color-primary: ' . $options['wcjcal_field_color-primary'] . ";\n" : '') .
        ($options['wcjcal_field_color-secondary'] ? '--cw-color-secondary: ' . $options['wcjcal_field_color-secondary'] . ";\n" : '') .
        ($options['wcjcal_field_color-dark'] ? '--cw-color-dark: ' . $options['wcjcal_field_color-dark'] . ";\n" : '') .
        ($options['wcjcal_field_color-light'] ? '--cw-color-light: ' . $options['wcjcal_field_color-light'] . ";\n" : '') .
        ($options['wcjcal_field_color-primary-alt'] ? '--cw-color-primary-alt: ' . $options['wcjcal_field_color-primary-alt'] . ";\n" : '') .
        ($options['wcjcal_field_color-secondary-alt'] ? '--cw-color-secondary-alt: ' . $options['wcjcal_field_color-secondary-alt'] : '') .
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
    'wcjcal'
));

wp_enqueue_script('wcjcal-script');
wp_enqueue_style('wcjcal-style');

return '<div id="wcjcal" data-wcjcal-settings="' . esc_attr(wp_json_encode($settings)) . '" class="alignwide"></div>';
