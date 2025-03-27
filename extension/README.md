# Ninja-exam

Extension permettant de garder des antisèches discrètes à portée de clic pendant vos examens en ligne.

## Fonctionnalités

- **Stockage discret** : Conservez vos réponses et formules importantes sans attirer l'attention.
- **Recherche rapide** : Retrouvez instantanément l'info dont vous avez besoin pendant un exam.
- **Organisation par matière** : Classez vos antisèches par catégorie pour plus d'efficacité.
- **Édition facile** : Modifiez vos antisèches à tout moment.

## Comment utiliser

1. Cliquez sur l'icône de l'extension dans votre navigateur.
2. Utilisez l'onglet "Ajouter antisèche" pour enregistrer une nouvelle réponse.
3. Pendant l'examen, cliquez sur l'icône et recherchez rapidement ce dont vous avez besoin.

## Interface

- **Mes antisèches** : Affichez et recherchez parmi vos antisèches existantes.
- **Ajouter antisèche** : Créez de nouvelles antisèches avec question, réponse et catégorie.

## Pour les développeurs

### Installation pour le développement

1. Clonez ce dépôt
2. Ouvrez Firefox et accédez à `about:debugging`
3. Cliquez sur "Ce Firefox"
4. Cliquez sur "Charger un module temporaire"
5. Sélectionnez le fichier `manifest.json` dans le répertoire du projet

### Structure des fichiers

- `manifest.json` : Configuration de l'extension
- `popup.html` : Interface utilisateur principale
- `popup.js` : Logique de l'interface utilisateur
- `content.js` : Script injecté dans les pages web
- `background.js` : Fonctionnalités en arrière-plan
- `content.css` : Styles pour le contenu injecté

## Avertissement

Cette extension est fournie à des fins éducatives uniquement. L'utilisation d'antisèches pendant un examen sans autorisation peut être contraire aux règles de votre établissement. Utilisez de manière responsable. 