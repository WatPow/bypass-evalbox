/**
 * Study Cards Assistant - Script d'arrière-plan
 * Gère la communication entre le popup et les scripts de contenu
 */

// Initialiser les paramètres par défaut si nécessaire
browser.runtime.onInstalled.addListener(() => {
  // Définir les paramètres par défaut
  browser.storage.local.get('settings', (data) => {
    if (!data.settings) {
      const defaultSettings = {
        autoShow: false,
        floatingMode: false,
        opacity: 0.9,
        shortcut: 'ctrl+q'
      };
      
      browser.storage.local.set({ settings: defaultSettings });
    }
  });
  
  // Créer quelques cartes d'exemple
  browser.storage.local.get('cards', (data) => {
    if (!data.cards || data.cards.length === 0) {
      const exampleCards = [
        {
          id: Date.now(),
          title: "1 - JITR permet d'économiser de l'argent en :",
          content: "✅ A) évitant l'enregistrement des appareils ayant échoué aux tests qualité en production\n\n\n\n\n❌ B) évitant la gestion de notre propre infrastructure PKI\n\n\n\n\n✅ C) évitant l'enregistrement des appareils qui ne sont pas encore vendus\n\n\n\n\n✅ D) enregistrant les appareils uniquement lors de leur première connexion",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 1,
          title: "2 - Clé de liaison Zigbee 3.0 :",
          content: "✅ A) la clé par défaut \"ZigbeeAlliance09\" est autorisée dans le profil standard \"smart home\"\n\n\n\n\n❌ B) la clé par défaut \"ZigbeeAlliance09\" est obligatoire dans le profil standard \"smart home\"\n\n\n\n\n❌ C) la clé par défaut \"ZigbeeAlliance09\" est autorisée dans les profils avancés comme \"smart energy\"\n\n\n\n\n✅ D) dans les profils avancés, le centre de confiance doit être provisionné avec la clé de chaque appareil",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 2,
          title: "3 - CoAP se traduit bien en :",
          content: "❌ A) Zigbee\n\n\n\n\n✅ B) HTTP\n\n\n\n\n❌ C) Matter\n\n\n\n\n❌ D) MQTT",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 3,
          title: "4 - À quoi peut être configuré un GPIO ?",
          content: "❌ A) aucune de ces réponses\n\n\n❌ B) les deux à la fois\n\n\n✅ C) modifier l'état d'un capteur\n\n\n✅ D) collecter l'état d'un capteur",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 4,
          title: "5 - Les certificats doivent être protégés :",
          content: "✅ A) lorsqu'ils sont stockés dans l'appareil\n\n\n✅ B) durant leur transmission à une entité distante\n\n\n❌ C) aucune protection n'est nécessaire, ce sont des données publiques",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 5,
          title: "6 - Comment restreindre les droits du personnel de maintenance dans les concentrateurs ?",
          content: "❌ A) Demander à l'employé de changer son mot de passe chaque semaine\n\n\n✅ B) Insérer l'identifiant du concentrateur cible dans le certificat du personnel\n\n\n✅ C) Utiliser des certificats de courte durée\n\n\n❌ D) Ajouter le nom/email/ID employé dans le certificat",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 6,
          title: "7 - Une lambda est exécutée avec le rôle :",
          content: "✅ A) associé spécifiquement à cette lambda\n\n\n❌ B) de l'entité ayant déclenché l'événement\n\n\n❌ C) labrole\n\n\n❌ D) avec les droits super utilisateur",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 7,
          title: "8 - Pour autoriser une skill Alexa à fonctionner avec une lambda, je dois :",
          content: "❌ A) Associer une politique (policy) à la skill Alexa\n\n\n✅ B) Fournir l'ID de la skill à la lambda AWS\n\n\n❌ C) Fournir l'ID de la lambda à la skill Alexa\n\n\n❌ D) Activer JITR",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 8,
          title: "9 - Un certificat de signature croisée (cross-signing) est utilisé dans le Plug & Charge :",
          content: "❌ A) pour gérer l'expiration du certificat d'autorité\n\n\n✅ B) pour simplifier la gestion du magasin de certificats des appareils\n\n\n✅ C) pour autoriser les OEM, bornes de recharge et émetteurs de contrat à gérer leur propre PKI\n\n\n❌ D) pour augmenter la durée de validité",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 9,
          title: "10 - Options pour réduire la charge d'authentification TLS et l'impact énergétique IoT ?",
          content: "❌ A) utiliser des certificats en chaîne complète\n\n\n❌ B) révoquer les objets (things) et non les certificats\n\n\n✅ C) utiliser le stapling OCSP\n\n\n❌ D) émettre les certificats des appareils directement par la CA racine\n\n\n✅ E) utiliser le \"server certificate pinning\"",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 10,
          title: "11 - Si une requête CoAP GET retourne une erreur inconnue :",
          content: "❌ A) quelqu'un doit d'abord la créer avec un POST\n\n\n❌ B) quelqu'un doit d'abord la créer avec un PUT\n\n\n❌ C) je n'ai pas le droit de la lire\n\n\n✅ D) la ressource n'existe pas",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 11,
          title: "12 - Les clés de voiture sont souvent compromises à cause :",
          content: "✅ A) de leur exposition intrinsèque aux attaques par relais\n\n\n✅ B) d'une mauvaise diversification des clés, menant à une très faible entropie\n\n\n❌ C) de l'absence de protection contre les attaques par rejeu (replay)\n\n\n❌ D) des utilisateurs qui ne sont pas assez vigilants",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 12,
          title: "13 - Quels mécanismes de sécurité sont recommandés pour l'IoT ?",
          content: "✅ A) Secure boot\n\n\n❌ B) Ne pas émettre de certificats signés par une autorité racine\n\n\n✅ C) Utiliser l'obfuscation\n\n\n✅ D) Mises à jour sécurisées\n\n\n❌ E) Utiliser des certificats 4K",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 13,
          title: "14 - La production des appareils IoT est divisée en phases, laquelle n'est PAS liée à la sécurité ?",
          content: "❌ A) Préparation des données\n\n\n❌ B) Provisionnement Cloud\n\n\n✅ C) Injection de données\n\n\n❌ D) Contrôle qualité",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 14,
          title: "15 - Risques à utiliser un même certificat pour plusieurs appareils ?",
          content: "❌ A) Device Defender devient inutile\n\n\n✅ B) Les politiques deviennent inutiles\n\n\n❌ C) Impossible de bloquer une connexion frauduleuse\n\n\n✅ D) Plus grand risque d'exposition de la clé privée (commune à tous les appareils)",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 15,
          title: "16 - Les attaques sur la chaîne d'approvisionnement des modèles d'IA peuvent se produire :",
          content: "✅ A) sur le modèle déjà déployé\n\n\n❌ B) pendant le processus d'étiquetage des données\n\n\n✅ C) sur les données utilisées pour l'entraînement\n\n\n✅ D) sur les modèles pré-entraînés\n\n\n✅ E) sur le moteur open source utilisé",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 16,
          title: "17 - Une URI CoAP décrit :",
          content: "✅ A) une ressource d'un objet\n\n\n❌ B) une fonction d'un objet\n\n\n❌ C) des droits d'accès",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 17,
          title: "18 - L'accès au bus CAN est sécurisé par :",
          content: "✅ A) rien\n\n\n❌ B) des clés AES\n\n\n❌ C) des certificats\n\n\n❌ D) l'isolation\n\n\n❌ E) le VIN (numéro de châssis)",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 18,
          title: "19 - La meilleure manière de contrôler la sécurité d'un système MQTT est :",
          content: "❌ A) un broker privé dédié\n\n\n✅ B) l'authentification TLS\n\n\n❌ C) un nom de topic compliqué\n\n\n❌ D) un login / mot de passe",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 19,
          title: "20 - Avec AWS JITR, un appareil branché pour la première fois :",
          content: "✅ A) se connectera à la deuxième tentative\n\n\n❌ B) se connectera après activation manuelle de son certificat\n\n\n✅ C) se connectera si sa CA racine est en mode auto-provisionnement\n\n\n❌ D) se connectera immédiatement",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 20,
          title: "21 - Si nous ne faisons pas confiance au sous-traitant pour la fabrication, que devons-nous faire ?",
          content: "✅ A) Lui fournir uniquement une sous-autorité de certification (sub-CA) pour émettre les certificats de mes appareils\n\n\n✅ B) Changer les clés des appareils lors de leur première connexion\n\n\n✅ C) Lui envoyer un nombre de clés égal au nombre d'appareils commandés\n\n\n❌ D) Lui fournir une bibliothèque obfusquée pour diversifier les clés de mes appareils",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 21,
          title: "22 - Pour permettre à un 'thing' de publier sur un broker AWS, il faut :",
          content: "❌ A) une politique avec l'autorisation `iot:connect`\n\n\n❌ B) un nom de groupe associé au \"thing\"\n\n\n✅ C) une politique avec `iot:connect` et `iot:publish`\n\n\n✅ D) un certificat associé au \"thing\"",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 22,
          title: "23 - La clé réseau Zigbee peut être compromise en :",
          content: "✅ A) utilisant la clé standard bien connue\n\n\n❌ B) la demandant à l'appareil le plus proche\n\n\n✅ C) piratant un objet déjà enregistré sur le réseau\n\n\n✅ D) forçant un appareil à se ré-enregistrer et en espionnant le réseau",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 23,
          title: "24 - Comment peut-on réduire la surface d'attaque des solutions IoT ?",
          content: "✅ A) coller la mémoire et les composants\n\n\n❌ B) réduire le nombre de suites cryptographiques TLS autorisées\n\n\n✅ C) fermer les ports inutilisés sur l'appareil\n\n\n❌ D) utiliser un fournisseur de services cloud\n\n\n✅ E) utiliser l'obfuscation",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 24,
          title: "25 - Comment le standard Plug-n-Charge résout-il le provisionnement initial du contrat ?",
          content: "✅ A) Le fournisseur de services de mobilité envoie le contrat chiffré avec le certificat de l'OEM automobile\n\n\n❌ B) Il envoie le contrat chiffré avec le certificat de la borne de recharge\n\n\n❌ C) L'utilisateur insère une clé USB dans la borne de recharge\n\n\n❌ D) Le fournisseur de services de mobilité envoie le contrat en OTA directement à la voiture",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 25,
          title: "26 - Si je fabrique des lampes connectées pour un marché mondial, je dois :",
          content: "❌ A) ne respecter aucune exigence de sécurité\n\n\n❌ B) obtenir une certification de chaque agence nationale de sécurité\n\n\n❌ C) effectuer un test d'intrusion (pentest) sur ma solution\n\n\n✅ D) vérifier si certains pays imposent des réglementations définissant un niveau minimum de sécurité",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 26,
          title: "27 - Pour découvrir les ressources d'un endpoint CoAP :",
          content: "✅ A) je peux faire une requête sur l'URI de l'objet `/.well-known/core`\n\n\n❌ B) je peux m'abonner avec un message `observe` CoAP\n\n\n❌ C) je peux diffuser un message de découverte (broadcast)",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 27,
          title: "28 - IoT signifie :",
          content: "❌ A) Input Output Telecommunication\n\n\n❌ B) Infinity of Threats\n\n\n❌ C) Input Output Terminal\n\n\n✅ D) Internet of Things (Internet des objets)",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 28,
          title: "29 - Un 'measured boot' :",
          content: "❌ A) peut uniquement être évalué à distance\n\n\n✅ B) rapporte la chaîne de démarrage qui a été suivie\n\n\n❌ C) notifie l'utilisateur local que la machine est dans un état valide\n\n\n❌ D) s'arrête dès qu'une configuration invalide est détectée",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 29,
          title: "30 - Pour sécuriser la clé de mon détecteur de fumée, je peux :",
          content: "✅ A) obfusquer la clé avec une autre clé codée en dur\n\n\n❌ B) remplacer mon processeur par un modèle supportant le secure boot\n\n\n❌ C) demander à l'utilisateur de saisir une phrase de passe protégeant la clé\n\n\n✅ D) stocker la clé dans une mémoire OneTimeProgrammable (mémoire OTP)",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 30,
          title: "31 - Quels sont les problèmes potentiels lors de la fabrication des objets IoT ?",
          content: "❌ A) la ligne de fabrication peut être déconnectée d'Internet\n\n\n✅ B) le sous-traitant de fabrication peut ne pas être digne de confiance\n\n\n✅ C) la génération des clés prend du temps\n\n\n❌ D) l'appareil n'a pas de batterie",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 31,
          title: "32 - MQTT permet à deux appareils de communiquer :",
          content: "❌ A) en mode client-serveur\n\n\n❌ B) uniquement en mode client\n\n\n❌ C) uniquement en mode serveur\n\n\n✅ D) via un broker",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 32,
          title: "33 - Le coût d'une fonction Lambda est :",
          content: "✅ A) basé sur le nombre d'exécutions\n\n\n❌ B) basé sur la taille du code\n\n\n✅ C) basé sur le temps d'exécution\n\n\n✅ D) basé sur la région",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 33,
          title: "34 - Les assistants vocaux peuvent exposer la sécurité / vie privée de l'utilisateur :",
          content: "❌ A) car il n'y a pas de sécurité réseau\n\n\n✅ B) via une skill frauduleuse\n\n\n✅ C) car il n'y a pas d'authentification vocale\n\n\n✅ D) dans les échanges entre la skill et la fonction Lambda",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 34,
          title: "35 - Mécanismes prérequis minimums obligatoires pour la mise à jour du firmware IoT ?",
          content: "✅ A) TLS\n\n\n✅ B) Secure boot\n\n\n❌ C) Trust store\n\n\n✅ D) Signature du code",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 35,
          title: "36 - Le niveau QoS 0 dans MQTT est :",
          content: "✅ A) le niveau le plus bas\n\n\n✅ B) ne fournit aucune garantie\n\n\n❌ C) le niveau le plus élevé\n\n\n❌ D) garantit que le message sera livré au moins une fois\n\n\n✅ E) garantit que le message sera livré au maximum une fois",
          category: "science",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 36,
          title: "37 - Pour détecter un comportement anormal des objets :",
          content: "✅ A) un profil de sécurité Device Defender peut être utilisé\n\n\n❌ B) TLS devrait être utilisé\n\n\n✅ C) des règles peuvent être utilisées pour compter le nombre de messages\n\n\n✅ D) on peut s'abonner aux topics système",
          category: "science",
          dateAdded: new Date().toISOString()
        }
      ];
      
      browser.storage.local.set({ cards: exampleCards });
    }
  });
});

// Écouter les modifications des onglets pour mettre à jour les cartes
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // Actualiser les cartes sur les nouveaux sites
    browser.tabs.sendMessage(tabId, { action: 'refreshCards' })
      .catch(error => {
        // Erreur normale si le script de contenu n'est pas encore chargé
        // Aucune action nécessaire
      });
  }
});

// Écouter les messages des autres parties de l'extension
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Gérer les messages si nécessaire
  if (message.action === 'getTabInfo') {
    browser.tabs.query({ active: true, currentWindow: true })
      .then(tabs => {
        if (tabs && tabs.length > 0) {
          sendResponse({ tab: tabs[0] });
        } else {
          sendResponse({ error: 'Aucun onglet actif trouvé' });
        }
      });
    return true; // Nécessaire pour indiquer que sendResponse sera appelé de façon asynchrone
  }
}); 