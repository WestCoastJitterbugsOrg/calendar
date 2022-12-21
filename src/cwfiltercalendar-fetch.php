<?php

function wcjcal_get_events()
{

	$options = get_option('cwfc_options');

	if(!$options) {
		return new WP_Error( 'broke', "Cogwork calendar options not set" );
	}

	$body = [
		'org' => $options['org'],
		'pw' => $options['apikey'],
		'regStatus' => 0,
		'dateInterval' => 'future'
	];

	$args = [
		'body'        => $body,
		'timeout'     => '5',
		'redirection' => '5',
		'httpversion' => '1.0',
		'blocking'    => true,
		'cookies'     => [],
	];

	$response = wp_remote_post('https://minaaktiviteter.se/xml/?type=events', $args);
	if (is_wp_error($response)) {
		return $response->get_error_message();
	} else {
		$body = wp_remote_retrieve_body($response);
		$xml = simplexml_load_string($body, null, LIBXML_NOCDATA);
		return $xml;
	}
}
