### 1 - JITR permet d'économiser de l'argent en :
✅ A) évitant l’enregistrement des appareils ayant échoué aux tests qualité en production  
❌ B) évitant la gestion de notre propre infrastructure PKI  
✅ C) évitant l’enregistrement des appareils qui ne sont pas encore vendus  
✅ D) enregistrant les appareils uniquement lors de leur première connexion  

---

### 2 - Clé de liaison Zigbee 3.0 :
✅ A) la clé par défaut "ZigbeeAlliance09" est autorisée dans le profil standard "smart home"  
❌ B) la clé par défaut "ZigbeeAlliance09" est obligatoire dans le profil standard "smart home"  
❌ C) la clé par défaut "ZigbeeAlliance09" est autorisée dans les profils avancés comme "smart energy"  
✅ D) dans les profils avancés, le centre de confiance doit être provisionné avec la clé de chaque appareil  

---

### 3 - CoAP se traduit bien en :
❌ A) Zigbee  
✅ B) HTTP  
❌ C) Matter  
❌ D) MQTT  

---

### 4 - À quoi peut être configuré un GPIO ?
❌ A) aucune de ces réponses  
❌ B) les deux à la fois  
✅ C) modifier l’état d’un capteur  
✅ D) collecter l’état d’un capteur  

---

### 5 - Les certificats doivent être protégés :
✅ A) lorsqu’ils sont stockés dans l’appareil  
✅ B) durant leur transmission à une entité distante  
❌ C) aucune protection n’est nécessaire, ce sont des données publiques  

---

### 6 - Comment peut-on restreindre les droits du personnel de maintenance dans les concentrateurs de données ?
❌ A) Demander à l’employé de changer son mot de passe chaque semaine  
✅ B) Insérer l'identifiant du concentrateur cible dans le certificat du personnel  
✅ C) Utiliser des certificats de courte durée  
❌ D) Ajouter le nom/email/ID employé dans le certificat  

---

### 7 - Une lambda est exécutée avec le rôle :
✅ A) associé spécifiquement à cette lambda  
❌ B) de l’entité ayant déclenché l’événement  
❌ C) labrole  
❌ D) avec les droits super utilisateur  

---

### 8 - Pour autoriser une skill Alexa à fonctionner avec une lambda, je dois :
❌ A) Associer une politique (policy) à la skill Alexa  
✅ B) Fournir l’ID de la skill à la lambda AWS  
❌ C) Fournir l’ID de la lambda à la skill Alexa 
❌ D) Activer JITR  

---

### 9 - Un certificat de signature croisée (cross-signing) est utilisé dans le Plug & Charge :
❌ A) pour gérer l’expiration du certificat d’autorité  
✅ B) pour simplifier la gestion du magasin de certificats des appareils  
✅ C) pour autoriser les OEM, bornes de recharge et émetteurs de contrat à gérer leur propre PKI  
❌ D) pour augmenter la durée de validité  

---

### 10 - Quelles sont les options pour réduire la charge d’authentification TLS et l’impact énergétique sur les objets IoT ?
❌ A) utiliser des certificats en chaîne complète  
❌ B) révoquer les objets (things) et non les certificats  
✅ C) utiliser le stapling OCSP  
❌ D) émettre les certificats des appareils directement par la CA racine  
✅ E) utiliser le “server certificate pinning”  

---

### 11 - Si une requête CoAP GET retourne une erreur inconnue :
❌ A) quelqu’un doit d’abord la créer avec un POST  
❌ B) quelqu’un doit d’abord la créer avec un PUT  
❌ C) je n’ai pas le droit de la lire  
✅ D) la ressource n’existe pas  

---

### 12 - Les clés de voiture sont souvent compromises à cause :
✅ A) de leur exposition intrinsèque aux attaques par relais  
✅ B) d’une mauvaise diversification des clés, menant à une très faible entropie  
❌ C) de l’absence de protection contre les attaques par rejeu (replay)  
❌ D) des utilisateurs qui ne sont pas assez vigilants  

---

### 13 - Quels mécanismes de sécurité sont recommandés pour l’IoT ?
✅ A) Secure boot  
❌ B) Ne pas émettre de certificats signés par une autorité racine  
✅ C) Utiliser l’obfuscation  
✅ D) Mises à jour sécurisées  
❌ E) Utiliser des certificats 4K  

---

### 14 - La production des appareils IoT est souvent divisée en phases, laquelle n’est **pas** liée à la sécurité ?
❌ A) Préparation des données  
❌ B) Provisionnement Cloud  
✅ C) Injection de données  
❌ D) Contrôle qualité  

---

### 15 - Quels sont les risques à utiliser un **même certificat** pour plusieurs appareils ?
❌ A) Device Defender devient inutile  
✅ B) Les politiques deviennent inutiles  
❌ C) Impossible de bloquer une connexion frauduleuse  
✅ D) Plus grand risque d’exposition de la clé privée (commune à tous les appareils)  

---

### 16 - Les attaques sur la chaîne d’approvisionnement des modèles d’IA peuvent se produire :
✅ A) sur le modèle déjà déployé  
❌ B) pendant le processus d’étiquetage des données  
✅ C) sur les données utilisées pour l’entraînement  
✅ D) sur les modèles pré-entraînés  
✅ E) sur le moteur open source utilisé  

---

### 17 - Une URI CoAP décrit :
✅ A) une ressource d’un objet  
❌ B) une fonction d’un objet  
❌ C) des droits d’accès  

---

### 18 - L’accès au bus CAN est sécurisé par :
✅ A) rien  
❌ B) des clés AES  
❌ C) des certificats  
❌ D) l’isolation  
❌ E) le VIN (numéro de châssis)  

---

### 19 - La meilleure manière de contrôler la sécurité d’un système MQTT est :
❌ A) un broker privé dédié  
✅ B) l’authentification TLS  
❌ C) un nom de topic compliqué  
❌ D) un login / mot de passe  

---

### 20 - Avec AWS JITR, un appareil branché pour la première fois :
✅ A) se connectera à la deuxième tentative  
❌ B) se connectera après activation manuelle de son certificat  
✅ C) se connectera si sa CA racine est en mode auto-provisionnement  
❌ D) se connectera immédiatement  

---

### 21 - Si nous ne faisons pas confiance au sous-traitant pour la fabrication, que devons-nous faire ?
✅ A) Lui fournir uniquement une sous-autorité de certification (sub-CA) pour émettre les certificats de mes appareils  
✅ B) Changer les clés des appareils lors de leur première connexion  
✅ C) Lui envoyer un nombre de clés égal au nombre d’appareils commandés  
❌ D) Lui fournir une bibliothèque obfusquée pour diversifier les clés de mes appareils  

---

### 22 - Pour permettre à un "thing" de publier sur un broker AWS, il faut :
❌ A) une politique avec l’autorisation `iot:connect`  
❌ B) un nom de groupe associé au "thing"  
✅ C) une politique avec `iot:connect` et `iot:publish`  
✅ D) un certificat associé au "thing"  

---

### 23 - La clé réseau Zigbee peut être compromise en :
✅ A) utilisant la clé standard bien connue  
❌ B) la demandant à l’appareil le plus proche  
✅ C) piratant un objet déjà enregistré sur le réseau  
✅ D) forçant un appareil à se ré-enregistrer et en espionnant le réseau  

---

### 24 - Comment peut-on réduire la surface d’attaque des solutions IoT ?
✅ A) coller la mémoire et les composants  
❌ B) réduire le nombre de suites cryptographiques TLS autorisées  
✅ C) fermer les ports inutilisés sur l’appareil  
❌ D) utiliser un fournisseur de services cloud  
✅ E) utiliser l’obfuscation  

---

### 25 - Comment le standard Plug-n-Charge résout-il le provisionnement initial du contrat ?
✅ A) Le fournisseur de services de mobilité envoie le contrat chiffré avec le certificat de l’OEM automobile  
❌ B) Il envoie le contrat chiffré avec le certificat de la borne de recharge  
❌ C) L’utilisateur insère une clé USB dans la borne de recharge  
❌ D) Le fournisseur de services de mobilité envoie le contrat en OTA directement à la voiture  

---

### 26 - Si je fabrique des lampes connectées pour un marché mondial, je dois :
❌ A) ne respecter aucune exigence de sécurité  
❌ B) obtenir une certification de chaque agence nationale de sécurité  
❌ C) effectuer un test d’intrusion (pentest) sur ma solution  
✅ D) vérifier si certains pays imposent des réglementations définissant un niveau minimum de sécurité  

---

### 27 - Pour découvrir les ressources d’un endpoint CoAP :
✅ A) je peux faire une requête sur l’URI de l’objet `/.well-known/core`  
❌ B) je peux m’abonner avec un message `observe` CoAP  
❌ C) je peux diffuser un message de découverte (broadcast)  

---

### 28 - IoT signifie :
❌ A) Input Output Telecommunication  
❌ B) Infinity of Threats  
❌ C) Input Output Terminal  
✅ D) Internet of Things (Internet des objets)  

---

### 29 - Un "measured boot" :
❌ A) peut uniquement être évalué à distance  
✅ B) rapporte la chaîne de démarrage qui a été suivie  
❌ C) notifie l’utilisateur local que la machine est dans un état valide  
❌ D) s’arrête dès qu’une configuration invalide est détectée  

---

### 30 - Pour sécuriser la clé de mon détecteur de fumée, je peux :
✅ A) obfusquer la clé avec une autre clé codée en dur  
❌ B) remplacer mon processeur par un modèle supportant le secure boot  
❌ C) demander à l’utilisateur de saisir une phrase de passe protégeant la clé  
✅ D) stocker la clé dans une mémoire OneTimeProgrammable (mémoire OTP)  

---

### 31 - Quels sont les problèmes potentiels lors de la phase de fabrication des objets IoT ?
❌ A) la ligne de fabrication peut être déconnectée d’Internet  
✅ B) le sous-traitant de fabrication peut ne pas être digne de confiance  
✅ C) la génération des clés prend du temps  
❌ D) l’appareil n’a pas de batterie  

---

### 32 - MQTT permet à deux appareils de communiquer :
❌ A) en mode client-serveur  
❌ B) uniquement en mode client  
❌ C) uniquement en mode serveur  
✅ D) via un broker  

---

### 33 - Le coût d’une fonction Lambda est :
✅ A) basé sur le nombre d’exécutions  
❌ B) basé sur la taille du code  
✅ C) basé sur le temps d’exécution  
✅ D) basé sur la région  

---

### 34 - Les assistants vocaux peuvent exposer la sécurité / vie privée de l’utilisateur :
❌ A) car il n’y a pas de sécurité réseau  
✅ B) via une skill frauduleuse  
✅ C) car il n’y a pas d’authentification vocale  
✅ D) dans les échanges entre la skill et la fonction Lambda  

---

### 35 - Quels sont les **mécanismes prérequis minimums obligatoires** pour la mise à jour du firmware d’un objet IoT ?
✅ A) TLS  
✅ B) Secure boot  
❌ C) Trust store  
✅ D) Signature du code  

---

### 36 - Le niveau QoS 0 dans MQTT est :
✅ A) le niveau le plus bas  
✅ B) ne fournit aucune garantie  
❌ C) le niveau le plus élevé  
❌ D) garantit que le message sera livré au moins une fois  
✅ E) garantit que le message sera livré au maximum une fois  

---

### 37 - Pour détecter un comportement anormal des objets :
✅ A) un profil de sécurité Device Defender peut être utilisé  
❌ B) TLS devrait être utilisé  
✅ C) des règles peuvent être utilisées pour compter le nombre de messages  
✅ D) on peut s’abonner aux topics système  