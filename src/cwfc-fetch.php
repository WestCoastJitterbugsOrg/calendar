<?php

function cwfc_get_events(array $attributes)
{

	$body = [
		'org' => $attributes['Organization'],
		'pw' => $attributes['Password'],
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
		return json_encode([
			'type' => 'error',
			'data' => $response
		]);
	} else {
		$body = wp_remote_retrieve_body($response);
		$xml = simplexml_load_string($body, null, LIBXML_NOCDATA);
		$events = $xml->xpath('//events/event');
		return json_encode([
			'type' => 'ok',
			'data' => [
				'events' => $events,
				'colors' => $attributes['Colors']
			]
		]);
	}
}
