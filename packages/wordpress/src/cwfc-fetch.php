<?php

function cwfc_fetch()
{
	$password = get_option('cwfc_pw-hash-mapping_' . $_POST['pw_hash']);
	$body = [
		'org' => $_POST['org'],
		'pw' => $password,
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
		'timeout' => 20
	];

	$response = wp_remote_post(
		'https://minaaktiviteter.se/xml/?type=events',
		$args
	);
	if (is_wp_error($response)) {
		http_response_code(500);
		echo json_encode($response);
		wp_die($response);
	} else {
		$body = wp_remote_retrieve_body($response);
		$xml = simplexml_load_string($body, null, LIBXML_NOCDATA);
		$events = $xml->xpath('//events/event');
		echo json_encode($events);
		wp_die();
	}
}
