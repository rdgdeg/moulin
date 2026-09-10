<?php

declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';
require_login();

$days = ['monday' => 'Lundi', 'tuesday' => 'Mardi', 'wednesday' => 'Mercredi', 'thursday' => 'Jeudi', 'friday' => 'Vendredi'];
$menu = read_json('menu.json', [
    'weekLabel' => '',
    'updatedAt' => '',
    'note' => '',
    'days' => [],
]);

$saved = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $daysData = [];
    foreach (array_keys($days) as $key) {
        $suggestions = preg_split('/\r\n|\r|\n/', (string) ($_POST[$key . '_suggestions'] ?? ''));
        $daysData[$key] = [
            'dish' => trim((string) ($_POST[$key . '_dish'] ?? '')),
            'suggestions' => array_values(array_filter(array_map('trim', $suggestions))),
        ];
    }
    $menu = [
        'weekLabel' => trim((string) ($_POST['weekLabel'] ?? '')),
        'updatedAt' => date('Y-m-d'),
        'note' => trim((string) ($_POST['note'] ?? '')),
        'days' => $daysData,
    ];
    write_json('menu.json', $menu);
    $saved = true;
}

function admin_nav(string $current): void
{
    echo '<nav class="nav"><a href="menu.php"' . ($current === 'menu' ? ' class="is-on"' : '') . '>Menu de la semaine</a>';
    echo '<a href="settings.php"' . ($current === 'settings' ? ' class="is-on"' : '') . '>Réglages</a>';
    echo '<a href="logout.php">Quitter</a></nav>';
}

?><!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Menu de la semaine</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body>
  <header class="top">
    <strong>Le Moulin · admin</strong>
    <?php admin_nav('menu'); ?>
  </header>
  <main class="wrap">
    <h1>Menu de la semaine</h1>
    <?php if ($saved): ?><p class="ok">Enregistré. Le site public le reprendra dans la minute.</p><?php endif; ?>
    <form method="post">
      <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
      <label>Intitulé de la semaine
        <input name="weekLabel" value="<?= h((string) ($menu['weekLabel'] ?? '')) ?>" placeholder="Semaine du 8 au 12 septembre 2026">
      </label>
      <label>Note (réservations, midi uniquement…)
        <input name="note" value="<?= h((string) ($menu['note'] ?? '')) ?>">
      </label>
      <div class="days">
        <?php foreach ($days as $key => $label):
            $day = $menu['days'][$key] ?? ['dish' => '', 'suggestions' => []];
            $suggestions = implode("\n", $day['suggestions'] ?? []);
        ?>
        <fieldset>
          <legend><?= h($label) ?></legend>
          <label>Plat du jour
            <input name="<?= h($key) ?>_dish" value="<?= h((string) ($day['dish'] ?? '')) ?>">
          </label>
          <label>Suggestions (une par ligne)
            <textarea name="<?= h($key) ?>_suggestions" rows="3"><?= h($suggestions) ?></textarea>
          </label>
        </fieldset>
        <?php endforeach; ?>
      </div>
      <button type="submit">Publier le menu</button>
    </form>
  </main>
</body>
</html>
