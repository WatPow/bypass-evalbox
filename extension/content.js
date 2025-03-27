/**
 * Study Cards Assistant - Script de contenu
 * Affiche les cartes avec des réponses sur n'importe quelle page web
 */

(function() {
  // État global
  let settings = {
    autoShow: false,
    floatingMode: false,
    opacity: 0.9,
    shortcut: 'ctrl+q'
  };
  
  let cards = [];
  let cardsContainer = null;
  let cardsVisible = false;
  let draggedCard = null;
  let offsetX = 0, offsetY = 0;
  
  // Initialisation
  function init() {
    loadSettings();
    loadCards();
    createUI();
    setupEventListeners();
  }
  
  // Charger les paramètres depuis le stockage
  function loadSettings() {
    browser.storage.local.get('settings', function(data) {
      if (data.settings) {
        settings = { ...settings, ...data.settings };
      }
      
      // Appliquer les paramètres immédiatement
      if (cardsContainer) {
        cardsContainer.style.opacity = settings.opacity;
      }
    });
  }
  
  // Charger les cartes depuis le stockage
  function loadCards() {
    browser.storage.local.get('cards', function(data) {
      cards = data.cards || [];
      updateCardsDisplay();
    });
  }
  
  // Créer l'interface utilisateur
  function createUI() {
    // Conteneur principal des cartes
    cardsContainer = document.createElement('div');
    cardsContainer.id = 'study-cards-container';
    cardsContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      max-height: 80vh;
      overflow-y: auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      padding: 10px;
      font-family: Arial, sans-serif;
      display: none;
      opacity: ${settings.opacity};
      transition: opacity 0.3s;
    `;
    
    // En-tête
    const header = document.createElement('div');
    header.className = 'study-cards-header';
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
      margin-bottom: 10px;
      cursor: ${settings.floatingMode ? 'move' : 'default'};
    `;
    
    // Titre
    const title = document.createElement('div');
    title.textContent = 'Mes cartes d\'étude';
    title.style.cssText = `
      font-weight: bold;
      color: #5e35b1;
    `;
    
    // Boutons de contrôle
    const controls = document.createElement('div');
    
    // Bouton pour masquer
    const hideBtn = document.createElement('button');
    hideBtn.textContent = '✕';
    hideBtn.style.cssText = `
      background: none;
      border: none;
      color: #888;
      cursor: pointer;
      font-size: 16px;
      padding: 0 5px;
    `;
    hideBtn.onclick = toggleCardsVisibility;
    
    // Assembler l'en-tête
    controls.appendChild(hideBtn);
    header.appendChild(title);
    header.appendChild(controls);
    cardsContainer.appendChild(header);
    
    // Conteneur pour les cartes
    const cardsContent = document.createElement('div');
    cardsContent.className = 'study-cards-content';
    cardsContainer.appendChild(cardsContent);
    
    // Ajouter à la page
    document.body.appendChild(cardsContainer);
    
    // Activer le glisser-déposer pour l'en-tête
    if (settings.floatingMode) {
      header.addEventListener('mousedown', startDragging);
    }
    
    // Montrer les cartes automatiquement si configuré
    if (settings.autoShow) {
      setTimeout(() => {
        toggleCardsVisibility(true);
      }, 1000);
    }
  }
  
  // Configurer les écouteurs d'événements
  function setupEventListeners() {
    // Écouteur pour le raccourci clavier
    document.addEventListener('keydown', function(e) {
      if (handleShortcut(e)) {
        toggleCardsVisibility();
      }
    });
    
    // Écouteur pour le glisser-déposer
    document.addEventListener('mousemove', moveCard);
    document.addEventListener('mouseup', stopDragging);
    
    // Écouter les messages de l'extension
    browser.runtime.onMessage.addListener(function(message) {
      if (message.action === 'updateSettings') {
        settings = { ...settings, ...message.settings };
        
        if (cardsContainer) {
          cardsContainer.style.opacity = settings.opacity;
        }
      } else if (message.action === 'refreshCards') {
        loadCards();
      }
    });
    
    // Écouteur pour les mises à jour de stockage
    browser.storage.onChanged.addListener(function(changes) {
      if (changes.cards) {
        cards = changes.cards.newValue || [];
        updateCardsDisplay();
      }
      
      if (changes.settings) {
        settings = { ...settings, ...changes.settings.newValue };
        
        if (cardsContainer) {
          cardsContainer.style.opacity = settings.opacity;
        }
      }
    });
  }
  
  // Mettre à jour l'affichage des cartes
  function updateCardsDisplay() {
    if (!cardsContainer) return;
    
    const cardsContent = cardsContainer.querySelector('.study-cards-content');
    if (!cardsContent) return;
    
    cardsContent.innerHTML = '';
    
    if (cards.length === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.textContent = 'Aucune carte ajoutée. Ajoutez des cartes depuis le popup.';
      emptyMsg.style.cssText = `
        color: #888;
        text-align: center;
        padding: 20px 0;
        font-style: italic;
      `;
      cardsContent.appendChild(emptyMsg);
      return;
    }
    
    // Grouper par catégorie
    const cardsByCategory = groupByCategory(cards);
    
    // Créer les sections par catégorie
    for (const [category, categoryCards] of Object.entries(cardsByCategory)) {
      // Créer un en-tête de catégorie si nécessaire
      if (category !== 'undefined') {
        const categoryHeader = document.createElement('div');
        categoryHeader.textContent = getCategoryLabel(category);
        categoryHeader.style.cssText = `
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 5px;
          padding-bottom: 3px;
          border-bottom: 1px solid #eee;
          color: ${getCategoryColor(category)};
        `;
        cardsContent.appendChild(categoryHeader);
      }
      
      // Ajouter les cartes de cette catégorie
      categoryCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'study-card';
        cardElement.style.cssText = `
          background-color: #f9f9f9;
          border-radius: 5px;
          padding: 8px;
          margin-bottom: 8px;
          border-left: 3px solid ${getCategoryColor(card.category)};
        `;
        
        const cardTitle = document.createElement('div');
        cardTitle.className = 'study-card-title';
        cardTitle.textContent = card.title;
        cardTitle.style.cssText = `
          font-weight: bold;
          margin-bottom: 5px;
        `;
        
        const cardContent = document.createElement('div');
        cardContent.className = 'study-card-content';
        const formattedContent = card.content.replace(/\n/g, '<br>');
        cardContent.innerHTML = formattedContent;
        cardContent.style.cssText = `
          font-size: 13px;
          line-height: 1.4;
          color: #333;
          white-space: normal;
        `;
        
        cardElement.appendChild(cardTitle);
        cardElement.appendChild(cardContent);
        cardsContent.appendChild(cardElement);
      });
    }
  }
  
  // Grouper les cartes par catégorie
  function groupByCategory(cardsArray) {
    return cardsArray.reduce((acc, card) => {
      const category = card.category || 'undefined';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(card);
      return acc;
    }, {});
  }
  
  // Obtenir le libellé d'une catégorie
  function getCategoryLabel(category) {
    const labels = {
      'math': 'Mathématiques',
      'science': 'Sciences',
      'history': 'Histoire',
      'language': 'Langues',
      'other': 'Autre',
      'undefined': 'Sans catégorie'
    };
    
    return labels[category] || 'Autre';
  }
  
  // Obtenir la couleur d'une catégorie
  function getCategoryColor(category) {
    const colors = {
      'math': '#4caf50',
      'science': '#2196f3',
      'history': '#ff9800',
      'language': '#9c27b0',
      'other': '#607d8b',
      'undefined': '#9e9e9e'
    };
    
    return colors[category] || '#9e9e9e';
  }
  
  // Vérifier si un raccourci clavier a été pressé
  function handleShortcut(event) {
    const shortcut = settings.shortcut || 'ctrl+q';
    const keys = shortcut.split('+');
    
    if (keys.includes('ctrl') && !event.ctrlKey) return false;
    if (keys.includes('alt') && !event.altKey) return false;
    if (keys.includes('shift') && !event.shiftKey) return false;
    
    const key = keys[keys.length - 1];
    
    // Gestion du cas spécial 'espace'
    if (key === 'space' && event.code === 'Space') return true;
    
    // Pour les autres touches
    if (key.length === 1 && event.key.toLowerCase() === key.toLowerCase()) return true;
    
    return false;
  }
  
  // Afficher ou masquer les cartes
  function toggleCardsVisibility(show) {
    if (show === undefined) {
      cardsVisible = !cardsVisible;
    } else {
      cardsVisible = show;
    }
    
    if (cardsContainer) {
      cardsContainer.style.display = cardsVisible ? 'block' : 'none';
    }
  }
  
  // Gérer le glisser-déposer
  function startDragging(e) {
    if (!settings.floatingMode) return;
    
    draggedCard = cardsContainer;
    const rect = draggedCard.getBoundingClientRect();
    
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    // Éviter la sélection de texte pendant le glisser
    e.preventDefault();
  }
  
  function moveCard(e) {
    if (!draggedCard) return;
    
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    
    // Limiter le déplacement à l'intérieur de la fenêtre
    const maxX = window.innerWidth - draggedCard.offsetWidth;
    const maxY = window.innerHeight - draggedCard.offsetHeight;
    
    draggedCard.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    draggedCard.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
  }
  
  function stopDragging() {
    draggedCard = null;
  }
  
  // Initialiser au chargement de la page
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 