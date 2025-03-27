/**
 * EvalBox Bypass Advanced
 * Script JavaScript pour contourner les mécanismes de détection anti-triche avancés
 * 
 * Ce script neutralise :
 * - performance.now()
 * - visibility API
 * - focus/blur events
 * - Battery API
 * - requestAnimationFrame
 * - SharedWorkers/ServiceWorkers
 * - Canvas fingerprinting
 * - Et bien plus
 */

class EvalBoxBypass {
  constructor() {
    this.originalNow = Performance.prototype.now;
    this.originalRAF = window.requestAnimationFrame;
    this.originalAddEventListener = EventTarget.prototype.addEventListener;
    this.originalGetContext = HTMLCanvasElement.prototype.getContext;
    
    this.baseTime = this.originalNow.call(performance);
    this.lastTimeStamp = Date.now();
    this.initialized = false;
  }
  
  /**
   * Initialise toutes les protections
   */
  initialize() {
    if (this.initialized) return;
    
    console.log("[EvalBox Bypass] Initialisation des protections avancées...");
    
    this.neutralizePerformanceAPI();
    this.neutralizeVisibilityAPI();
    this.neutralizeBatteryAPI();
    this.neutralizeEventListeners();
    this.neutralizeCanvasFingerprinting();
    this.neutralizeRafTiming();
    this.neutralizeStorageEvents();
    this.neutralizeWebRTC();
    this.neutralizeUserAgentDetection();
    this.neutralizeDevToolsDetection();
    this.neutralizeWindowProperties();
    this.neutralizeWorkers();
    this.simulateUserActivity();
    this.detectTimingMonitors();
    
    this.initialized = true;
    
    // Vérifier que tout fonctionne
    this.testProtections();
    
    console.log("[EvalBox Bypass] Protection activée avec succès!");
  }
  
  /**
   * Neutraliser performance.now() et Date
   */
  neutralizePerformanceAPI() {
    const self = this;
    
    // Remplacer performance.now() au niveau du prototype
    Performance.prototype.now = function() {
      const currentTime = Date.now();
      const elapsed = currentTime - self.lastTimeStamp;
      self.lastTimeStamp = currentTime;
      
      // Simuler ~60 FPS
      self.baseTime += Math.min(elapsed, 17);
      
      return self.baseTime;
    };
    
    // Protéger Date.now() également (utilisé comme fallback par certains systèmes)
    const originalDateNow = Date.now;
    const dateNowStart = originalDateNow();
    const perfNowStart = performance.now();
    
    Date.now = function() {
      const diff = performance.now() - perfNowStart;
      return dateNowStart + diff;
    };
  }
  
  /**
   * Neutraliser l'API de visibilité du document
   */
  neutralizeVisibilityAPI() {
    try {
      // Override document.hidden
      Object.defineProperty(document, 'hidden', {
        get: function() { return false; },
        configurable: true
      });
      
      // Override document.visibilityState
      Object.defineProperty(document, 'visibilityState', {
        get: function() { return 'visible'; },
        configurable: true
      });
      
      // Override document.hasFocus
      document.hasFocus = function() { return true; };
    } catch (e) {
      console.log("[EvalBox Bypass] Erreur lors de la neutralisation de l'API de visibilité (non critique): ", e);
    }
  }
  
  /**
   * Neutraliser l'API de batterie
   */
  neutralizeBatteryAPI() {
    if (navigator.getBattery) {
      navigator.getBattery = function() {
        return new Promise(function(resolve) {
          const fakeBattery = {
            charging: true,
            chargingTime: Infinity,
            dischargingTime: Infinity,
            level: 0.95,
            addEventListener: function() {},
            removeEventListener: function() {}
          };
          resolve(fakeBattery);
        });
      };
    }
  }
  
  /**
   * Neutraliser les écouteurs d'événements pour focus/blur/visibility
   */
  neutralizeEventListeners() {
    const self = this;
    
    // Bloquer les écouteurs d'événements de visibilité
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      const blockedEvents = [
        'visibilitychange', 'blur', 'focus', 'mouseleave',
        'pageshow', 'pagehide', 'freeze', 'resume'
      ];
      
      if (blockedEvents.includes(type)) {
        // Ne pas attacher ces écouteurs
        return;
      }
      
      return self.originalAddEventListener.call(this, type, listener, options);
    };
    
    // Intercepter les événements existants
    const blockEvent = function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
    };
    
    this.originalAddEventListener.call(window, 'blur', blockEvent, true);
    this.originalAddEventListener.call(document, 'visibilitychange', blockEvent, true);
    this.originalAddEventListener.call(window, 'focus', function() {}, true);
  }
  
  /**
   * Neutraliser le fingerprinting par Canvas
   */
  neutralizeCanvasFingerprinting() {
    const self = this;
    
    // Intercepter getContext pour modifier légèrement les rendus canvas
    HTMLCanvasElement.prototype.getContext = function() {
      const context = self.originalGetContext.apply(this, arguments);
      
      if (arguments[0] === '2d') {
        const originalGetImageData = context.getImageData;
        const originalToDataURL = this.toDataURL;
        
        // Modifier légèrement les données d'image
        context.getImageData = function() {
          const imageData = originalGetImageData.apply(this, arguments);
          
          // Modifier quelques pixels de manière imperceptible mais suffisante
          // pour tromper le fingerprinting
          if (imageData && imageData.data && imageData.data.length > 0) {
            // Modifier un pixel sur mille
            for (let i = 0; i < imageData.data.length; i += 1000) {
              if (imageData.data[i] > 0) {
                imageData.data[i] -= 1;
              }
            }
          }
          
          return imageData;
        };
        
        // Intercepter toDataURL
        this.toDataURL = function() {
          return originalToDataURL.apply(this, arguments);
        };
      }
      
      return context;
    };
  }
  
  /**
   * Neutraliser le timing via requestAnimationFrame
   */
  neutralizeRafTiming() {
    const self = this;
    let lastRafTime = 0;
    
    window.requestAnimationFrame = function(callback) {
      return self.originalRAF.call(window, function(timestamp) {
        // Fournir un timestamp cohérent (environ 60 FPS)
        if (lastRafTime === 0) {
          lastRafTime = timestamp;
        } else {
          lastRafTime += 16.67; // ~60 FPS
        }
        
        callback(lastRafTime);
      });
    };
  }
  
  /**
   * Neutraliser les événements de stockage
   */
  neutralizeStorageEvents() {
    // Neutraliser les événements storage qui peuvent être utilisés pour la communication inter-onglets
    const originalDispatchEvent = EventTarget.prototype.dispatchEvent;
    
    EventTarget.prototype.dispatchEvent = function(event) {
      if (event && event.type === 'storage') {
        return true; // Bloquer l'événement
      }
      return originalDispatchEvent.call(this, event);
    };
  }
  
  /**
   * Neutraliser WebRTC pour empêcher la détection IP
   */
  neutralizeWebRTC() {
    if (window.RTCPeerConnection) {
      const originalRTC = window.RTCPeerConnection;
      
      window.RTCPeerConnection = function() {
        const pc = new originalRTC(arguments[0]);
        
        // Neutraliser createOffer
        const originalCreateOffer = pc.createOffer;
        pc.createOffer = function() {
          return originalCreateOffer.apply(this, arguments)
            .then(function(offer) {
              // Modifier l'offre SDP pour masquer les IPs
              offer.sdp = offer.sdp.replace(/IP4 \d+\.\d+\.\d+\.\d+/g, 'IP4 1.1.1.1');
              return offer;
            });
        };
        
        return pc;
      };
    }
  }
  
  /**
   * Neutraliser la détection de l'agent utilisateur
   */
  neutralizeUserAgentDetection() {
    const originalUserAgent = navigator.userAgent;
    
    // Empêcher les modifications de userAgent
    Object.defineProperty(navigator, 'userAgent', {
      get: function() { return originalUserAgent; },
      configurable: true
    });
  }
  
  /**
   * Neutraliser la détection des outils de développement
   */
  neutralizeDevToolsDetection() {
    // Bloquer les techniques de détection DevTools
    Object.defineProperty(window, 'console', {
      get: function() { return console; },
      set: function() {},
      configurable: true
    });
    
    // Neutraliser console.profiles
    if (console.profiles) {
      console.profiles = [];
    }
    
    // Neutraliser la détection via les temps d'exécution
    const originalConsoleLog = console.log;
    console.log = function() {
      return originalConsoleLog.apply(this, arguments);
    };
  }
  
  /**
   * Neutraliser les propriétés de fenêtre qui peuvent être utilisées pour la détection
   */
  neutralizeWindowProperties() {
    // Protéger les propriétés de taille et position de la fenêtre
    const props = ['outerHeight', 'outerWidth', 'screenX', 'screenY'];
    
    props.forEach(prop => {
      const originalValue = window[prop];
      Object.defineProperty(window, prop, {
        get: function() { return originalValue; },
        configurable: true
      });
    });
  }
  
  /**
   * Neutraliser les Workers qui peuvent être utilisés pour la communication
   */
  neutralizeWorkers() {
    // Intercepter SharedWorker
    if (window.SharedWorker) {
      const OriginalSharedWorker = window.SharedWorker;
      window.SharedWorker = function() {
        console.log("[EvalBox Bypass] Tentative de création de SharedWorker bloquée");
        return new OriginalSharedWorker(URL.createObjectURL(new Blob([''], {type: 'application/javascript'})));
      };
    }
    
    // Intercepter ServiceWorker
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register = function() {
        return new Promise((resolve, reject) => reject(new Error('ServiceWorker registration blocked')));
      };
    }
  }
  
  /**
   * Simuler l'activité utilisateur
   */
  simulateUserActivity() {
    // Simuler des mouvements de souris aléatoires
    setInterval(() => {
      const event = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: Math.floor(Math.random() * window.innerWidth),
        clientY: Math.floor(Math.random() * window.innerHeight)
      });
      document.dispatchEvent(event);
    }, 3000);
    
    // Simuler des mouvements de scroll occasionnels
    setInterval(() => {
      if (Math.random() > 0.7) {
        window.scrollBy(0, Math.random() > 0.5 ? 5 : -5);
      }
    }, 10000);
  }
  
  /**
   * Détecter et neutraliser les systèmes de surveillance par timing
   */
  detectTimingMonitors() {
    // 1. Intercepter setInterval pour détecter les fonctions de timing
    const originalSetInterval = window.setInterval;
    
    window.setInterval = (callback, delay) => {
      const callbackStr = callback.toString();
      
      if (callbackStr.includes('performance.now') && 
          (callbackStr.includes('diff') || callbackStr.includes('delta') || 
           callbackStr.includes('elapsed') || callbackStr.includes('timing'))) {
        console.log("[EvalBox Bypass] Système de détection de timing trouvé et neutralisé");
        return originalSetInterval(() => {}, delay); // Remplacer par une fonction vide
      }
      
      return originalSetInterval(callback, delay);
    };
    
    // 2. Scanner les scripts existants
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      const content = script.textContent || script.innerText || '';
      
      if (content.includes('performance.now') && 
          (content.includes('hidden') || content.includes('visibilityState') || 
           content.includes('blur') || content.includes('focus'))) {
        console.log("[EvalBox Bypass] Script de surveillance détecté");
      }
    });
  }
  
  /**
   * Tester si les protections fonctionnent correctement
   */
  testProtections() {
    // Test performance.now
    const start = performance.now();
    
    setTimeout(() => {
      const end = performance.now();
      const diff = end - start;
      console.log(`[EvalBox Bypass] Test performance.now: ${diff.toFixed(2)}ms (devrait être ~50ms)`);
      
      if (diff >= 45 && diff <= 55) {
        console.log("[EvalBox Bypass] Protection performance.now OK");
      }
    }, 50);
    
    // Tester document.hidden
    console.log(`[EvalBox Bypass] Test document.hidden: ${document.hidden} (devrait être false)`);
    console.log(`[EvalBox Bypass] Test document.visibilityState: ${document.visibilityState} (devrait être visible)`);
  }
}

// Exporter pour utilisation externe
window.EvalBoxBypass = EvalBoxBypass; 