<?php

function cwfc_get_events()
{
	$options = get_option('cwfc_options');

	if (!$options) {
		return new WP_Error('broke', 'Cogwork calendar options not set');
	}

	$body = [
		'org' => $options['CWFC_ORG'],
		'pw' => $options['CWFC_APIKEY'],
		'regStatus' => 0,
		'dateInterval' => 'future',
	];

	$args = [
		'body' => $body,
		'timeout' => '5',
		'redirection' => '5',
		'httpversion' => '1.0',
		'blocking' => true,
		'cookies' => [],
	];

	$response = wp_remote_post(
		'https://minaaktiviteter.se/xml/?type=events',
		$args
	);
	if (is_wp_error($response)) {
		return $response;
	} else {
		$body = wp_remote_retrieve_body($response);
		$xml = simplexml_load_string($body, null, LIBXML_NOCDATA);
		return $xml;
	}
}