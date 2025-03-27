# EvalBox Bypass Tool

Un outil permettant de contourner les restrictions de navigation et les mécanismes de détection d'EvalBox et autres plateformes d'examen similaires.

## Description

Ce projet propose plusieurs solutions pour contourner les détections anti-triche des plateformes d'examen en ligne comme EvalBox. Ces outils permettent de naviguer librement entre les onglets pendant un examen sans être détecté.

## Solutions disponibles

### 1. EvalBox Killer (Recommandé)

L'outil le plus efficace et le plus simple à utiliser.

**Fonctionnalités:**
- Neutralise `performance.now()` au niveau du prototype
- Désactive les détections de changement d'onglet
- Bloque les détections de focus/blur
- Recherche et désactive proactivement les mécanismes de surveillance

**Utilisation:**
1. Ouvrez `evalbox-killer.html`
2. Cliquez sur "Générer Code"
3. Copiez le code généré
4. Ouvrez la console développeur dans l'onglet d'examen (F12)
5. Collez et exécutez le code dans la console

### 2. Méthode d'injection directe

Une approche alternative utilisant `localStorage` pour la communication entre onglets.

**Fonctionnalités:**
- Communication inter-onglets
- Simulation d'activité utilisateur
- Neutralisation des API de détection

**Utilisation:**
1. Ouvrez `bypass-direct.html`
2. Suivez les instructions à l'écran

### 3. Solutions iframe (Moins fiables)

Plusieurs solutions basées sur des iframes sont également disponibles, mais sont moins fiables en raison des restrictions de sécurité des navigateurs:
- `bypass-frame-pro.html`
- `bypass-frame-simple.html`

## Avertissement

Cet outil est développé uniquement à des fins éducatives pour comprendre les mécanismes de sécurité web. L'utilisation de cet outil pour tricher lors d'examens peut être contraire aux politiques de l'établissement.

## Compatibilité

- Chrome, Firefox, Edge (dernières versions)
- Ne fonctionne pas sur mobile

## Problèmes connus

- Certaines propriétés comme `document.visibilityState` peuvent être non-configurables dans certains navigateurs, mais cela n'affecte pas la fonctionnalité principale
- Les sites avec une protection CORS stricte peuvent nécessiter des ajustements supplémentaires

## Comment fonctionnent les systèmes de détection

Les plateformes comme EvalBox utilisent plusieurs techniques pour détecter si vous quittez la page d'examen :

1. **API Visibility** (`document.hidden`, `visibilityState`) - Détecte quand vous changez d'onglet
2. **Événements Focus/Blur** - Détecte quand la fenêtre perd le focus
3. **Performance Timing** (`performance.now()`) - Détecte des anomalies de timing quand l'onglet est inactif
4. **Tracking de souris** - Surveille les mouvements de souris et les périodes d'inactivité

## Solution : Bypass Frame

Notre solution utilise le fichier `bypass-frame.html` qui encapsule la page d'examen dans un iframe tout en maintenant son activité, même lorsque vous changez d'onglet.

### Comment l'utiliser

1. Téléchargez le fichier `bypass-frame.html` et placez-le dans un dossier local
2. Ouvrez `bypass-frame.html` dans votre navigateur
3. Entrez l'URL de votre page d'examen dans le champ prévu
4. Cliquez sur "Charger"
5. Vous pouvez maintenant naviguer librement sur d'autres onglets sans être détecté !

### Comment ça fonctionne

1. **Encapsulation** - La page d'examen est chargée dans un iframe
2. **Maintien du focus** - Notre page principale force l'iframe à rester considérée comme active
3. **Simulation d'activité** - Des mouvements de souris sont simulés pour maintenir l'activité
4. **Anti-détection** - Un script est injecté dans l'iframe pour neutraliser les méthodes de détection

### Fonctionnalités de l'interface

- **Champ URL** - Entrez l'URL de votre examen ici
- **Bouton Charger** - Charge l'URL dans l'iframe
- **Garder Focus** - Active/désactive la protection
- **Rafraîchir** - Recharge la page d'examen

## Pourquoi cette méthode est supérieure

Contrairement aux solutions basées uniquement sur des scripts JavaScript, notre approche par iframe :

- Contourne les détections au niveau du navigateur, pas seulement au niveau du JavaScript
- N'est pas affectée par les mises à jour des API de détection
- Fonctionne même avec les techniques de détection de timing les plus sophistiquées
- Ne nécessite pas d'extension tierce comme Tampermonkey ou Greasemonkey

## Limites et considérations

- Cette méthode peut ne pas fonctionner avec certains sites qui utilisent une protection contre l'encapsulation iframe (X-Frame-Options)
- Des systèmes anti-triche très avancés pourraient détecter l'utilisation d'un iframe
- Certaines plateformes utilisent également la surveillance par webcam ou d'autres méthodes qui ne peuvent pas être contournées par cette technique

## Test de votre installation

Vous pouvez tester si votre installation fonctionne en utilisant notre simulateur `evalbox.html` qui implémente les mêmes techniques de détection qu'EvalBox.

Pour tester :
1. Ouvrez `evalbox.html` à travers `bypass-frame.html`
2. Activez la détection par "Anomalies timing (performance.now)"
3. Changez d'onglet ou de fenêtre pendant quelques secondes
4. Si le bypass fonctionne, aucune anomalie ne devrait être détectée dans le journal des événements

## Captures d'écran

![Interface de Bypass Frame](bypass-frame-screenshot.png)
*L'interface de Bypass Frame avec un examen chargé*

## Conseils d'utilisation

- Utilisez un navigateur moderne (Chrome, Firefox, Edge) pour de meilleurs résultats
- Si la page ne se charge pas, vérifiez si le site utilise une protection contre les iframes
- Gardez la fenêtre de Bypass Frame ouverte mais minimisée pendant que vous consultez d'autres ressources

---

*Note : Ce projet est destiné à sensibiliser sur les méthodes de surveillance en ligne et leurs limites. N'utilisez pas cet outil pour des activités non autorisées.* 