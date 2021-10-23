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

/**
 * Shortcode which renders Root element for your React App.
 *
 * @return string
 */
function wcjcal_shortcode() {
	/**
	 * You can pass in here some data which if you need to have some settings/localization etc for your App,
	 * so you'll be able for example generate initial state of your app for Redux, based on some settings provided by WordPress.
	 */
	$settings = array(
		'i18n' => array(),
		'some_items' => array( ),
	);

	return '<div id="wcjcal" class="alignfull" style="margin: 0 1rem" data-default-settings="' . esc_attr( wp_json_encode( $settings ) ) . '"></div>';
}

add_shortcode(
	'wcjcal',
	'wcjcal_shortcode'
);

/**
 * Enqueues styles and js compiled for plugin.
 */
function wcjcal_enqueue_assets() {
	$ver         = (get_file_data( __FILE__, ["Version" => "Version"], false ))['Version'];
	$js_to_load  = plugin_dir_url( __FILE__ ) . 'build/static/js/bundle.js';
	$css_to_load = plugin_dir_url( __FILE__ ) . 'build/static/css/main.css';
	

	/* `wp-element` as dependency will load React and ReactDom for our app from `wp-includes` */
	wp_enqueue_script( 'wcjcal', $js_to_load, array( 'wp-element', "jquery" ), $ver, true );

	wp_enqueue_style( 'wcjcal', $css_to_load, array(), $ver );

}

add_action( 'wp_enqueue_scripts', 'wcjcal_enqueue_assets' );
