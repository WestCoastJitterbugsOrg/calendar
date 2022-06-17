<?php


function wcjcal_shortcode_wp_enqueue_assets()
{
	if (!function_exists('get_plugin_data')) {
		require_once(ABSPATH . 'wp-admin/includes/plugin.php');
	}
	$plugin_data = get_plugin_data(dirname(__FILE__) . '/wcj-calendar.php');
	$js_to_load  = plugin_dir_url(__FILE__) . 'wcjcal.js';

	wp_register_script('wcjcal-script', $js_to_load, [], $plugin_data["Version"], true);
	$result = wcjcal_get_events();
	wp_add_inline_script(
		'wcjcal-script',
		'window[\'wcjcal_ajax_obj\'] = ' . json_encode(
			[
				'data' => $result
			]
		),
		'before'
	);
}

add_action('wp_enqueue_scripts', 'wcjcal_shortcode_wp_enqueue_assets');


function wcjcal_shortcode($attributes)
{
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

	return '<div id="wcjcal" data-wcjcal-settings="' . esc_attr(wp_json_encode($settings)) . '" class="alignwide"></div>';
}

add_shortcode('wcjcal', 'wcjcal_shortcode');
