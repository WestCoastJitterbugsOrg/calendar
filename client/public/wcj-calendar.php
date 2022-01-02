<?php

/**
 * Plugin Name:       WCJ Calendar
 * Plugin URI:        https://github.com/WestCoastJitterbugsOrg/Personalized-Calendar
 * Description:       Filterable calendar using data from cogwork
 * Version:           1.4
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Jean-Philippe Green
 * Author URI:        https://github.com/PooSham
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wcj-calendar
 * Domain Path:       /languages
 */

function wcjcal_shortcode_wp_enqueue_assets()
{
	$ver         = (get_file_data(__FILE__, ["Version" => "Version"], false))['Version'];
	$js_to_load  = plugin_dir_url(__FILE__) . 'wcjcal.js';
	$css_to_load = plugin_dir_url(__FILE__) . 'wcjcal.css';

	/* `wp-element` as dependency will load React and ReactDom for our app from `wp-includes` */
	wp_register_script('wcjcal-script', $js_to_load, array('wp-element', "jquery"), $ver, true);
	wp_register_style('wcjcal-style', $css_to_load, array(), $ver);
}

add_action('wp_enqueue_scripts', 'wcjcal_shortcode_wp_enqueue_assets');


function wcjcal_shortcode($attributes)
{
	/**
	 * You can pass in here some data which if you need to have some settings/localization etc for your App,
	 * so you'll be able for example generate initial state of your app, based on some settings provided by WordPress.
	 */
	$defaultSettings = array(
		"width"    => '100%'
	);

	extract(shortcode_atts(
		$defaultSettings,
		$attributes,
		'wcjcal'
	));

	wp_enqueue_style('wcjcal-style');
	wp_enqueue_script('wcjcal-script');

	return '<div id="wcjcal" class="alignfull" data-wcjcal-settings="' . esc_attr(wp_json_encode($settings)) . '"></div>';
}

add_shortcode('wcjcal', 'wcjcal_shortcode');
