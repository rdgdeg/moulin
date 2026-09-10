# Le Moulin de la Hunelle

Site vitrine bilingue (FR / NL) : restaurant, salles de location, repas à domicile, puis savoir-faire de l’ETA.

## Lancer le site

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) — redirection vers `/fr`.

## Mini-admin PHP

Édite le menu de la semaine et quelques réglages (horaires, tarif repas à domicile, bandeau). Les fichiers JSON sont dans `data/`.

```bash
php -S localhost:8080 -t admin
```

Identifiants par défaut : `admin` / `moulin-admin` (à changer dans `admin/config.php` avant mise en ligne).

Si le front et l’admin sont sur des hôtes différents, renseigner `CONTENT_API_URL` (ex. `http://localhost:8080/api/content.php`). En local, Next.js lit directement `data/*.json`.

## Stack

- Next.js (App Router) + Tailwind + next-intl
- Admin PHP volontairement minuscule — pas WordPress

## Photos

Les visuels actuels sont des placeholders (Unsplash). Les remplacer par les photos du moulin, des salles et des plats dès qu’elles sont disponibles, dans `public/images/`.
