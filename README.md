# EvalBox Bypass Tool

Un outil permettant de contourner les restrictions de navigation et les mécanismes de détection d'EvalBox et autres plateformes d'examen similaires.

## Description

Ce projet propose une solution efficace pour contourner les détections anti-triche des plateformes d'examen en ligne comme EvalBox. L'outil permet de naviguer librement entre les onglets pendant un examen sans être détecté.

## Solution principale : EvalBox Killer

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

## Navigateur et Configuration Recommandés

Pour une protection optimale, nous recommandons d'utiliser les éléments suivants :

### Navigateur recommandé : Firefox

Firefox offre plus d'options de configuration pour la confidentialité et permet de désactiver certaines API utilisées pour la détection.

### Configuration Firefox optimale
1. Tapez `about:config` dans la barre d'adresse et acceptez l'avertissement
2. Définissez les configurations suivantes :
   - `privacy.resistFingerprinting` = `true`
   - `dom.event.clipboardevents.enabled` = `false`
   - `media.navigator.enabled` = `false`

### Extensions recommandées
- Privacy Badger - Bloque les traqueurs
- uBlock Origin - Bloqueur de publicités et de scripts
- CanvasBlocker - Empêche le fingerprinting via Canvas

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
3. Dans un autre onglet, ouvrez `evalbox-killer.html`
4. Générez et copiez le code d'injection
5. Revenez à l'onglet `evalbox.html` et exécutez le code dans la console
6. Testez en changeant d'onglet - aucune détection ne devrait apparaître

## Comment fonctionnent les systèmes de détection

Les plateformes comme EvalBox utilisent plusieurs techniques pour détecter si vous quittez la page d'examen :

1. **API Visibility** (`document.hidden`, `visibilityState`) - Détecte quand vous changez d'onglet
2. **Événements Focus/Blur** - Détecte quand la fenêtre perd le focus
3. **Performance Timing** (`performance.now()`) - Détecte des anomalies de timing quand l'onglet est inactif
4. **Tracking de souris** - Surveille les mouvements de souris et les périodes d'inactivité

## Comment fonctionne EvalBox Killer

Notre solution contourne ces détections en :

1. **Remplaçant performance.now()** - Modifie directement le prototype de Performance pour fournir des valeurs cohérentes
2. **Redéfinissant les propriétés de visibilité** - Neutralise document.hidden et visibilityState
3. **Bloquant les événements** - Empêche la propagation des événements blur/focus
4. **Simulant l'activité** - Génère des mouvements de souris aléatoires régulièrement

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