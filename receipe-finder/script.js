document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const recipeCards = document.querySelectorAll('.recipe-card');
  
    // Search Functionality
    searchBar.addEventListener('input', () => {
      const query = searchBar.value.toLowerCase();
  
      recipeCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const ingredients = card.dataset.ingredients.toLowerCase();
  
        // Show cards matching the search query
        if (name.includes(query) || ingredients.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  
    // Toggle Recipe Details
    recipeCards.forEach(card => {
      const toggleButton = card.querySelector('.toggle-recipe-btn');
      const details = card.querySelector('.recipe-details');
  
      toggleButton.addEventListener('click', () => {
        details.classList.toggle('visible');
      });
    });
  });
  