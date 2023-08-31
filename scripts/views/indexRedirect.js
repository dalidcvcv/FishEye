// Sélection des éléments du DOM
const btnGoToIndex = document.getElementById('btnGoToIndex');

// Ajout d'un gestionnaire d'événements au clic sur le bouton
btnGoToIndex.addEventListener('click', function() {
  // Redirection vers la page "index.html"
  window.location.href = 'index.html';
});
