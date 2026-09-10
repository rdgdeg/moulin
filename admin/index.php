<?php

declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

$config = require __DIR__ . '/config.php';

if (is_logged_in()) {
    header('Location: menu.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $user = trim((string) ($_POST['user'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    if (
        hash_equals($config['user'], $user) &&
        password_verify($password, $config['password_hash'])
    ) {
        $_SESSION['admin'] = $user;
        header('Location: menu.php');
        exit;
    }
    $error = 'Identifiants incorrects.';
}

?><!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin — Moulin de la Hunelle</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body class="login">
  <form method="post" class="card">
    <p class="kicker">Le Moulin de la Hunelle</p>
    <h1>Administration</h1>
    <p class="hint">Menu de la semaine et quelques réglages — pas un CMS.</p>
    <?php if ($error): ?><p class="error"><?= h($error) ?></p><?php endif; ?>
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <label>Identifiant
      <input name="user" required autocomplete="username">
    </label>
    <label>Mot de passe
      <input type="password" name="password" required autocomplete="current-password">
    </label>
    <button type="submit">Entrer</button>
  </form>
</body>
</html>
