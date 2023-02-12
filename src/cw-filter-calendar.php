<?php

/**
 * Plugin URI:        https://github.com/WestCoastJitterbugsOrg/Interactive-CogWork-Calendar
 * Plugin Name:       Interactive Calendar for CogWork data
 * Description:       Calendar using data from cogwork that allows filtering, reading event information and registration
 * Version:           2.0.0-beta4
 * Requires at least: 5.0
 * Requires PHP:      7.3
 * Author:            Jean-Philippe Green
 * Author URI:        https://github.com/PooSham
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cw-filter-calendar
 *
 * @package           cw-filter-calendar
 */

require_once __DIR__ . '/cwfc-fetch.php';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function cwfc_block_init()
{
	register_block_type(__DIR__, [
		'render_callback' => 'cwfc_block_render_callback',
	]);
}

add_action('init', 'cwfc_block_init');

/**
 * This function is called when the block is being rendered on the front end of the site
 *
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 */
function cwfc_block_render_callback($attributes, $content, $block_instance)
{
	$result = cwfc_get_events($attributes['Organization'], $attributes['Password']);
	$events = json_encode($result);

	ob_start();
?>
	<div class="wp-block-cw-addons-cw-filter-calendar"> </div>
	<script>
		const event = new CustomEvent("cw-filter-events-loaded", {
			detail: {
				...<?php echo $events ?>,
				colors: <?php echo json_encode($attributes['Colors']) ?>
			}
		});
		window.addEventListener("load", () => window.dispatchEvent(event));
	</script>
<?
	return ob_get_clean();
}
