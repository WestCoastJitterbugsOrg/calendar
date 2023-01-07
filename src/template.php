<?php

if (!function_exists('cwfc_get_events')) {
	require_once dirname(__FILE__) . '/cwfc-fetch.php';
}

$result = cwfc_get_events();

$data = is_wp_error($result) ? $result . error_get_last() : $result;

$enqueue_result = wp_enqueue_script('cw-addons-cw-filter-calendar-view-script-js');
$events = json_encode($data);

$add_inline_script_result = wp_add_inline_script(
	'cw-addons-cw-filter-calendar-view-script-js',
	// 'const event = new CustomEvent("cw-filter-events-loaded",' . $events  . ');
	'console.log("hello");'
	//window.dispatchEvent(event);'
);

echo $add_inline_script_result;