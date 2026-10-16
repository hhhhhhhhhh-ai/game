# PlayZone — portail de jeux HTML5

Site 100 % statique (aucune installation requise).

## Tester en local
```bash
cd playzone
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```
(Il faut un petit serveur, car le site charge `data/games.json`.)

## Mettre en ligne sur Netlify (gratuit)
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose le dossier `playzone` (ou le fichier zip).
3. Netlify te donne une adresse `xxxx.netlify.app` — tu peux la renommer dans *Site configuration > Change site name*.

## Ajouter un jeu
1. Crée un dossier `games/mon-jeu/` avec un `index.html` (jeu HTML5).
2. Ajoute une ligne dans `data/games.json` :
```json
{"id":"mon-jeu","title":"Mon jeu","category":"arcade","tags":[],"url":"games/mon-jeu/index.html","popular":false,"new":true,"thumb":{"emoji":"🎮","bg":"linear-gradient(135deg,#8b5cf6,#22d3ee)"}}
```
Catégories : `arcade`, `puzzle`, `board`, `skill`. Pour une vignette image : `"thumb":{"img":"games/mon-jeu/thumb.png"}`.

⚠️ N'ajoute que des jeux dont tu as les droits (les tiens, open source, ou des portails qui autorisent explicitement l'intégration comme itch.io ou les jeux sous licence libre). Copier les jeux d'autres sites peut violer le droit d'auteur et ferait refuser ton compte AdSense.

## Google AdSense
1. Ouvre `js/config.js`, mets `enabled: true`, ton `client` (`ca-pub-…`) et les identifiants de blocs (`slots`).
2. Remplace l'identifiant dans `ads.txt` (sans le `ca-`).
3. Re-déploie le site.

Conseils AdSense : il faut un nom de domaine à toi (un sous-domaine netlify.app est généralement refusé), une page de confidentialité (fournie : `privacy.html`), du contenu original, et attendre l'approbation (quelques jours à semaines).
