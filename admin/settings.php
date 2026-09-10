<?php

declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';
require_login();

$settings = read_json('settings.json', []);
$saved = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $settings = [
        'hoursNote' => trim((string) ($_POST['hoursNote'] ?? '')),
        'lunchFrom' => trim((string) ($_POST['lunchFrom'] ?? '')),
        'lunchTo' => trim((string) ($_POST['lunchTo'] ?? '')),
        'officeHours' => trim((string) ($_POST['officeHours'] ?? '')),
        'homeMealPrice' => trim((string) ($_POST['homeMealPrice'] ?? '')),
        'homeMealFormula' => trim((string) ($_POST['homeMealFormula'] ?? '')),
        'banner' => trim((string) ($_POST['banner'] ?? '')),
        'takeaway' => isset($_POST['takeaway']),
    ];
    write_json('settings.json', $settings);
    $saved = true;
}

?><!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Réglages</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body>
  <header class="top">
    <strong>Le Moulin · admin</strong>
    <nav class="nav">
      <a href="menu.php">Menu de la semaine</a>
      <a href="settings.php" class="is-on">Réglages</a>
      <a href="logout.php">Quitter</a>
    </nav>
  </header>
  <main class="wrap">
    <h1>Quelques réglages</h1>
    <p class="hint">Horaires, tarif repas à domicile, bandeau d’accueil. Le reste du site se code, pas ici.</p>
    <?php if ($saved): ?><p class="ok">Enregistré.</p><?php endif; ?>
    <form method="post">
      <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
      <label>Bandeau d’accueil (laisser vide pour masquer)
        <input name="banner" value="<?= h((string) ($settings['banner'] ?? '')) ?>">
      </label>
      <label>Note horaires restaurant
        <textarea name="hoursNote" rows="3"><?= h((string) ($settings['hoursNote'] ?? '')) ?></textarea>
      </label>
      <div class="row">
        <label>Service du midi, de
          <input name="lunchFrom" value="<?= h((string) ($settings['lunchFrom'] ?? '')) ?>">
        </label>
        <label>à
          <input name="lunchTo" value="<?= h((string) ($settings['lunchTo'] ?? '')) ?>">
        </label>
      </div>
      <label>Horaires d’accueil / secrétariat
        <input name="officeHours" value="<?= h((string) ($settings['officeHours'] ?? '')) ?>">
      </label>
      <label>Tarif repas à domicile
        <input name="homeMealPrice" value="<?= h((string) ($settings['homeMealPrice'] ?? '')) ?>">
      </label>
      <label>Formule repas à domicile
        <input name="homeMealFormula" value="<?= h((string) ($settings['homeMealFormula'] ?? '')) ?>">
      </label>
      <label class="check">
        <input type="checkbox" name="takeaway" <?= !empty($settings['takeaway']) ? 'checked' : '' ?>>
        Plats à emporter proposés
      </label>
      <button type="submit">Enregistrer</button>
    </form>
  </main>
</body>
</html>
