document.addEventListener('DOMContentLoaded', function() {
  // Éléments du DOM
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const addCardBtn = document.getElementById('add-card-btn');
  const cardTitle = document.getElementById('card-title');
  const cardContent = document.getElementById('card-content');
  const cardCategory = document.getElementById('card-category');
  const cardsContainer = document.getElementById('cards-container');
  const searchCards = document.getElementById('search-cards');
  const addSuccess = document.getElementById('add-success');
  
  // Gestion des onglets
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Supprimer la classe active de tous les onglets
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Ajouter la classe active à l'onglet cliqué
      this.classList.add('active');
      
      // Afficher le contenu correspondant
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
      
      // Si on change d'onglet pendant une édition, réinitialiser le bouton d'ajout
      if (tabId !== 'add-card' && addCardBtn.dataset.mode === 'edit') {
        addCardBtn.textContent = 'Ajouter l\'antisèche';
        addCardBtn.removeEventListener('click', handleUpdateCard);
        addCardBtn.addEventListener('click', handleAddCard);
        delete addCardBtn.dataset.mode;
        delete addCardBtn.dataset.cardId;
        
        // Réinitialiser le formulaire
        cardTitle.value = '';
        cardContent.value = '';
        cardCategory.value = '';
      }
      
      // Charger les cartes si on va dans l'onglet de visualisation
      if (tabId === 'view-cards') {
        loadCards();
      }
    });
  });
  
  // Fonction pour ajouter une carte
  addCardBtn.addEventListener('click', handleAddCard);
  
  // Fonction réutilisable pour ajouter une carte
  function addCard(title, content, category) {
    // Vérifier que les champs requis sont remplis
    if (!title || !content) {
      return false;
    }
    
    // Formater le contenu avec plus d'espaces entre les options
    content = content.replace(/(\n|\r\n)(\n|\r\n)(\n|\r\n)/g, "\n\n\n\n\n");
    
    // Créer un nouvel objet carte
    const newCard = {
      id: Date.now(),
      title: title,
      content: content,
      category: category,
      dateAdded: new Date().toISOString()
    };
    
    // Ajouter la carte à la liste existante
    browser.storage.local.get('cards', function(data) {
      const cards = data.cards || [];
      cards.push(newCard);
      
      // Sauvegarder la liste mise à jour
      browser.storage.local.set({ cards: cards }, function() {
        // Actualiser l'affichage des cartes
        loadCards();
        
        // Afficher un message de succès
        const successMsg = document.getElementById('add-success');
        successMsg.style.display = 'block';
        
        // Cacher le message après quelques secondes
        setTimeout(function() {
          successMsg.style.display = 'none';
        }, 3000);
      });
    });
    
    return true;
  }
  
  // Fonction pour charger et afficher les cartes
  function loadCards(searchTerm = '') {
    browser.storage.local.get('cards', function(data) {
      const cards = data.cards || [];
      
      // Effacer le contenu actuel
      cardsContainer.innerHTML = '';
      
      if (cards.length === 0) {
        cardsContainer.innerHTML = '<div class="no-cards">Aucune antisèche ajoutée</div>';
        return;
      }
      
      // Filtrer si un terme de recherche est fourni
      let filteredCards = cards;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredCards = cards.filter(card => 
          card.title.toLowerCase().includes(term) || 
          card.content.toLowerCase().includes(term) ||
          (card.category && card.category.toLowerCase().includes(term))
        );
        
        if (filteredCards.length === 0) {
          cardsContainer.innerHTML = '<div class="no-cards">Aucun résultat trouvé</div>';
          return;
        }
      }
      
      // Afficher les cartes
      filteredCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        // Utiliser innerHTML pour préserver les sauts de ligne
        const formattedContent = card.content.replace(/\n/g, '<br>');
        
        cardElement.innerHTML = `
          <div class="card-title">${card.title}</div>
          <div class="card-content">${formattedContent}</div>
          <button class="edit-btn" data-id="${card.id}">✎</button>
          <button class="delete-btn" data-id="${card.id}">×</button>
        `;
        
        // Ajouter une indication de catégorie si disponible
        if (card.category) {
          cardElement.style.borderLeft = '3px solid ' + getCategoryColor(card.category);
        }
        
        cardsContainer.appendChild(cardElement);
      });
      
      // Ajouter les écouteurs pour les boutons de suppression
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const cardId = parseInt(this.getAttribute('data-id'));
          deleteCard(cardId);
        });
      });
      
      // Ajouter les écouteurs pour les boutons d'édition
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const cardId = parseInt(this.getAttribute('data-id'));
          editCard(cardId);
        });
      });
    });
  }
  
  // Fonction pour obtenir une couleur basée sur la catégorie
  function getCategoryColor(category) {
    const colors = {
      'math': '#607d8b',      // Bleu gris
      'science': '#546e7a',   // Bleu gris foncé
      'history': '#78909c',   // Bleu gris clair
      'language': '#455a64',  // Bleu gris très foncé
      'other': '#90a4ae'      // Bleu gris très clair
    };
    
    return colors[category] || '#78909c';
  }
  
  // Fonction pour supprimer une carte
  function deleteCard(cardId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette antisèche ?')) {
      browser.storage.local.get('cards', function(data) {
        const cards = data.cards || [];
        const updatedCards = cards.filter(card => card.id !== cardId);
        
        browser.storage.local.set({ cards: updatedCards }, function() {
          loadCards(searchCards.value.trim());
        });
      });
    }
  }
  
  // Fonction pour éditer une carte
  function editCard(cardId) {
    browser.storage.local.get('cards', function(data) {
      const cards = data.cards || [];
      const cardToEdit = cards.find(card => card.id === cardId);
      
      if (!cardToEdit) return;
      
      // Passer à l'onglet d'ajout de carte
      tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === 'add-card') {
          tab.click();
        }
      });
      
      // Remplir le formulaire avec les données de la carte
      cardTitle.value = cardToEdit.title;
      cardContent.value = cardToEdit.content;
      cardCategory.value = cardToEdit.category || '';
      
      // Changer le texte du bouton et son comportement
      addCardBtn.textContent = 'Mettre à jour l\'antisèche';
      addCardBtn.dataset.mode = 'edit';
      addCardBtn.dataset.cardId = cardId;
      
      // Remplacer le gestionnaire d'événement
      addCardBtn.removeEventListener('click', handleAddCard);
      addCardBtn.addEventListener('click', handleUpdateCard);
    });
  }
  
  // Fonction pour gérer l'ajout de carte
  function handleAddCard() {
    const title = cardTitle.value.trim();
    const content = cardContent.value.trim();
    const category = cardCategory.value;
    
    if (!title || !content) {
      alert('Veuillez remplir tous les champs obligatoires!');
      return;
    }
    
    addCard(title, content, category);
    
    // Réinitialiser le formulaire
    cardTitle.value = '';
    cardContent.value = '';
    cardCategory.value = '';
  }
  
  // Fonction pour gérer la mise à jour d'une carte
  function handleUpdateCard() {
    const title = cardTitle.value.trim();
    const content = cardContent.value.trim();
    const category = cardCategory.value;
    const cardId = parseInt(addCardBtn.dataset.cardId);
    
    if (!title || !content) {
      alert('Veuillez remplir tous les champs obligatoires!');
      return;
    }
    
    // Mettre à jour la carte
    browser.storage.local.get('cards', function(data) {
      const cards = data.cards || [];
      const cardIndex = cards.findIndex(card => card.id === cardId);
      
      if (cardIndex !== -1) {
        cards[cardIndex].title = title;
        cards[cardIndex].content = content;
        cards[cardIndex].category = category;
        
        browser.storage.local.set({ cards: cards }, function() {
          // Remettre le bouton à son état original
          addCardBtn.textContent = 'Ajouter l\'antisèche';
          addCardBtn.removeEventListener('click', handleUpdateCard);
          addCardBtn.addEventListener('click', handleAddCard);
          delete addCardBtn.dataset.mode;
          delete addCardBtn.dataset.cardId;
          
          // Réinitialiser le formulaire
          cardTitle.value = '';
          cardContent.value = '';
          cardCategory.value = '';
          
          // Retourner à l'onglet des cartes
          tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === 'view-cards') {
              tab.click();
            }
          });
          
          // Afficher un message de succès
          addSuccess.textContent = 'Antisèche mise à jour avec succès!';
          addSuccess.style.display = 'block';
          setTimeout(function() {
            addSuccess.style.display = 'none';
          }, 3000);
        });
      }
    });
  }
  
  // Gérer la recherche
  searchCards.addEventListener('input', function() {
    loadCards(this.value.trim());
  });
  
  // Charger les cartes au démarrage
  loadCards();
}); 