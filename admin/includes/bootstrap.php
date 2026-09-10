<?php

declare(strict_types=1);

session_start();

define('DATA_DIR', dirname(__DIR__, 2) . '/data');

function data_path(string $file): string
{
    return DATA_DIR . '/' . $file;
}

function read_json(string $file, array $fallback = []): array
{
    $path = data_path($file);
    if (!is_readable($path)) {
        return $fallback;
    }
    $decoded = json_decode((string) file_get_contents($path), true);
    return is_array($decoded) ? $decoded : $fallback;
}

function write_json(string $file, array $data): void
{
    if (!is_dir(DATA_DIR)) {
        mkdir(DATA_DIR, 0775, true);
    }
    file_put_contents(
        data_path($file),
        json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    );
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(16));
    }
    return $_SESSION['csrf'];
}

function csrf_check(): void
{
    $token = $_POST['csrf'] ?? '';
    if (!hash_equals($_SESSION['csrf'] ?? '', $token)) {
        http_response_code(400);
        exit('Jeton de sécurité invalide.');
    }
}

function is_logged_in(): bool
{
    return !empty($_SESSION['admin']);
}

function require_login(): void
{
    if (!is_logged_in()) {
        header('Location: index.php');
        exit;
    }
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
