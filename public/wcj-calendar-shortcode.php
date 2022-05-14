<?php

function wcjcal_shortcode_wp_enqueue_assets()
{
	$ver         = (get_file_data(__FILE__, ["Version" => "Version"], false))['Version'];
	$js_to_load  = plugin_dir_url(__FILE__) . 'wcjcal.js';

	wp_register_script('wcjcal-script', $js_to_load, ['jquery'], $ver, true);
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

	$result = wcjcal_get_events();

	wp_localize_script(
		'wcjcal-script',
		'wcjcal_ajax_obj',
		array(
			'data' => $result
		)
	);
	
	return '<div id="wcjcal" data-wcjcal-settings="' . esc_attr(wp_json_encode($settings)) . '" class="alignwide"></div>';
}

add_shortcode('wcjcal', 'wcjcal_shortcode');