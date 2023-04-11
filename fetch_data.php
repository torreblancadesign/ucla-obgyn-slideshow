<?php
header('Content-Type: application/json');

$api_key = 'keywWrz3xmJWfbIuc';
$base_id = 'appB6PVySBlUkfh3M';
$table_name = 'Topics';

$url = 'https://api.airtable.com/v0/' . $base_id . '/' . urlencode($table_name);

$headers = [
    'Authorization: Bearer ' . $api_key,
    'Content-Type: application/json',
];



$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
curl_close($ch);

echo $result;

