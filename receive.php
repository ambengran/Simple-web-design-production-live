<?php

	$config = array(
		'save_method' => array('file'), // values: file, database
		'notification_method' => array('email'), // values: email

		'file_location' => 'uploads', // relative

		'notification_email' => 'eric@tawk.to,support@digitalcups.com,norbert@loveclients.com',
		'notification_from' => 'noreply@digitalcups.com',
		'notification_subject' => 'Form Submitted',
		'notification_content' => 'Somebody submitted your form.',
	);

	error_reporting(0);

	$formname = '';
	$filename = '';
	$filefolder = '';
	$files_added = array();

	$form_data = $_POST;

	// @todo: validate data

	// Save data using files.
	if (in_array('file', $config['save_method'])) {
		$date = new DateTime();
		$timestamp = $date->getTimestamp();
		$ip = $_SERVER['REMOTE_ADDR'];

		if (isset($form_data['_af_form_name'])) {
			$formname = $form_data['_af_form_name'];
			unset( $form_data['_af_form_name'] );
		}

		$filename = $config['file_location'] . '/' . ($formname ? $formname . '-' : '') . $timestamp . '-' . $ip . '.csv';
		$filefolder = $config['file_location'] . '/' . ($formname ? $formname . '-' : '') . $timestamp . '-' . $ip;
		$files_added[] = $filename;

		// @todo: validate data

		// Process files.
		if ($_FILES) {
			foreach ($_FILES as $i => $j) {
				if (!$j['error']) {
					mkdir( $filefolder, 0700 );
					$f = $filefolder . '/' . $i . '-' . $j['name'];
					copy( $j['tmp_name'], $f );
					$files_added[] = $f;
				}
			}
		}

		$fh = fopen($filename, 'w');

		foreach ($form_data as $f => $v) {
			fputcsv($fh, array($f, $v));
		}

		fclose($fh);
	}

	if (in_array('email', $config['notification_method'])) {
		// Might need email configuration.
		$headers = 'From: ' . $config['notification_from'] . "\r\n" .
		           'Reply-To: ' . $config['notification_from'] . "\r\n";

		$notification_content = $filename;

		mail(
			$config['notification_email'],
			$config['notification_subject'],
			$config['notification_content'] . "\r\n" . implode("\r\n", $files_added),
			$headers
		);
	}

	die(json_encode(array(
		'res' => 1
	)));