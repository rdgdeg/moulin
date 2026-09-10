<?php

declare(strict_types=1);

require dirname(__DIR__) . '/includes/bootstrap.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$resource = $_GET['resource'] ?? 'menu';
$file = $resource === 'settings' ? 'settings.json' : 'menu.json';
$payload = read_json($file, []);

echo json_encode($payload, JSON_UNESCAPED_UNICODE);
