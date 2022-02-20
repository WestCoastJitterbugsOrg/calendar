<?php

function wcjcal_get_events()
{
	wp_remote_get('URL to get events from cogwork here');
}

add_action('wcjcal_get_events', 'wcjcal_get_events');