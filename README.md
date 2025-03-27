# EvalBox Killer

Suite d'outils pour contourner la détection d'activité dans les systèmes d'examen en ligne.

## Outils disponibles

### EvalBox Killer
[`evalbox-killer.html`](evalbox-killer.html) - Version standard et stable pour contourner les principales détections:
- Neutralise performance.now()
- Bloque les événements de visibilité/focus
- Simule l'activité utilisateur
- Empêche la détection de changement d'onglet

### EvalBox Killer Ultimate
[`evalbox-killer-ultimate.html`](evalbox-killer-ultimate.html) - Version complète avec toutes les protections avancées:
- Toutes les fonctionnalités de la version standard
- Protection contre fingerprinting Canvas
- Neutralisation de l'API Battery
- Blocage des SharedWorkers et ServiceWorkers
- Protection contre les détections WebRTC
- Protection contre la détection des outils développeur
- Et plus encore...

### EvalBox Killer Advanced 
[`evalbox-killer-advanced.html`](evalbox-killer-advanced.html) - Version expérimentale avec techniques avancées

## Navigateur recommandé

Pour une protection optimale, nous recommandons d'utiliser **Firefox** avec ces configurations:

1. Tapez `about:config` dans la barre d'adresse
2. Définissez les configurations suivantes:
   - `privacy.resistFingerprinting` = `true`
   - `dom.event.clipboardevents.enabled` = `false`
   - `media.navigator.enabled` = `false`

### Extensions recommandées
- **Privacy Badger** - Bloque les traqueurs
- **uBlock Origin** - Bloqueur de publicités et de scripts
- **CanvasBlocker** - Empêche le fingerprinting via Canvas

## Usage

1. Ouvrez la page d'examen dans un onglet
2. Ouvrez un des outils EvalBox Killer dans un autre onglet
3. Suivez les instructions affichées

## Note

Un outil permettant de contourner les restrictions de navigation et les mécanismes de détection d'EvalBox et autres plateformes d'examen similaires.

## Description

Ce projet propose des solutions efficaces pour contourner les détections anti-triche des plateformes d'examen en ligne comme EvalBox. Ces outils permettent de naviguer librement entre les onglets pendant un examen sans être détecté.

## Solutions disponibles

### 1. EvalBox Killer Advanced (Recommandé)

La solution la plus complète qui neutralise toutes les méthodes connues de détection JavaScript.

**Fonctionnalités avancées:**
- Neutralisation de `performance.now()` et `Date.now()`
- Protection contre les détections via `requestAnimationFrame`
- Protection contre le fingerprinting via Canvas
- Neutralisation de l'API Battery
- Blocage des SharedWorkers et ServiceWorkers
- Protection contre les détections WebRTC
- Neutralisation des détections via propriétés de fenêtre
- Protection contre la détection des outils développeur
- Blocage complet des événements de visibilité et focus
- Simulation d'activité utilisateur (souris et scroll)

**Utilisation:**
1. Ouvrez `evalbox-killer-advanced.html`
2. Cliquez sur "Générer Code"
3. Copiez le code généré
4. Ouvrez la console développeur dans l'onglet d'examen (F12)
5. Collez et exécutez le code dans la console

### 2. EvalBox Killer (Version simple)

Une version plus légère mais efficace.

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

## Navigateur et Configuration Recommandés

Pour une protection optimale, nous recommandons d'utiliser les éléments suivants :

### Mode Navigation
Utilisez le mode de navigation privée qui désactive certains stockages persistants et limite le fingerprinting.

## Test avec l'outil de démonstration

Le projet inclut un outil de démonstration (`evalbox.html`) qui simule le comportement d'une plateforme d'examen avec des détections anti-triche.

**Fonctionnalités de la démo:**
- Simule les détections de changement d'onglet
- Implémente la détection par `performance.now()`
- Surveille les événements de focus/blur
- Affiche un journal des événements détectés

**Utilisation pour tester:**
1. Ouvrez `evalbox.html` dans un onglet
2. Activez les différentes détections
3. Dans un autre onglet, ouvrez `evalbox-killer-advanced.html` ou `evalbox-killer.html`
4. Générez et copiez le code d'injection
5. Revenez à l'onglet `evalbox.html` et exécutez le code dans la console
6. Testez en changeant d'onglet - aucune détection ne devrait apparaître

## Comment fonctionnent les systèmes de détection

Les plateformes comme EvalBox utilisent plusieurs techniques pour détecter si vous quittez la page d'examen :

1. **API Visibility** (`document.hidden`, `visibilityState`) - Détecte quand vous changez d'onglet
2. **Événements Focus/Blur** - Détecte quand la fenêtre perd le focus
3. **Performance Timing** (`performance.now()`) - Détecte des anomalies de timing quand l'onglet est inactif
4. **Tracking de souris** - Surveille les mouvements de souris et les périodes d'inactivité
5. **Battery API** - Surveille les changements d'état de batterie pour détecter l'inactivité
6. **requestAnimationFrame** - Autre méthode pour détecter les anomalies de timing quand l'onglet est inactif
7. **Canvas fingerprinting** - Génère une empreinte unique du navigateur qui pourrait changer si l'utilisateur change d'environnement

## Comment fonctionnent nos outils

Nos solutions contournent ces détections en :

1. **Remplaçant performance.now()** - Modifie directement le prototype de Performance pour fournir des valeurs cohérentes
2. **Redéfinissant les propriétés de visibilité** - Neutralise document.hidden et visibilityState
3. **Bloquant les événements** - Empêche la propagation des événements blur/focus
4. **Simulant l'activité** - Génère des mouvements de souris aléatoires régulièrement
5. **Neutralisant diverses API** - Empêche l'utilisation d'autres API pour la détection (version avancée)

## Organisation du projet

```
bypass-evalbox/
├── evalbox.html                   # Page de démonstration simulant un système de détection
├── evalbox-killer.html            # Solution simple mais efficace
├── evalbox-killer-ultimate.html   # Nouvelle version complète avec toutes les protections avancées
├── js/
│   ├── evalbox-bypass.js          # Script principal de bypass avancé
│   └── loader-inline.js                  # Chargeur pour générer le code d'injection
└── README.md                      # Ce fichier
```

## Avertissement

Cet outil est développé uniquement à des fins éducatives pour comprendre les mécanismes de sécurité web. L'utilisation de cet outil pour tricher lors d'examens peut être contraire aux politiques de l'établissement.

## Compatibilité

- Chrome, Firefox, Edge (dernières versions)
- Ne fonctionne pas sur mobile

## Problèmes connus

- Certaines propriétés comme `document.visibilityState` peuvent être non-configurables dans certains navigateurs, mais cela n'affecte pas la fonctionnalité principale
- Des messages d'erreur comme "can't redefine non-configurable property" peuvent apparaître dans la console, mais n'affectent pas le fonctionnement

---

*Note : Ce projet est destiné à sensibiliser sur les méthodes de surveillance en ligne et leurs limites. N'utilisez pas cet outil pour des activités non autorisées.* 