// Global variable to store all character data
let allCharacters = [];
let currentCharacter = null;

// Wait for the DOM to load before executing code
document.addEventListener('DOMContentLoaded', () => {
  // Get elements from the DOM
  const characterBar = document.getElementById('character-bar');
  const detailedInfo = document.getElementById('detailed-info');
  const nameEl = document.getElementById('name');
  const imageEl = document.getElementById('image');
  const voteCountEl = document.getElementById('vote-count');
  const votesForm = document.getElementById('votes-form');
  const resetBtn = document.getElementById('reset-btn');

  // Fetch all characters from the API
  fetchCharacters();

  // Add event listener for the votes form
  votesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const votesInput = document.getElementById('votes');
    const votes = parseInt(votesInput.value);

    if (currentCharacter && !isNaN(votes)) {
      // Add votes to the current character
      currentCharacter.votes += votes;

      // Update the display
      voteCountEl.textContent = currentCharacter.votes;

      // Reset the form
      votesForm.reset();
    }
  });

  // Add event listener for the reset button
  resetBtn.addEventListener('click', () => {
    if (currentCharacter) {
      // Reset votes to 0
      currentCharacter.votes = 0;

      // Update the display
      voteCountEl.textContent = '0';
    }
  });

  // Function to fetch characters from the API
  function fetchCharacters() {
    fetch('http://localhost:3000/characters')
      .then(response => response.json())
      .then(characters => {
        allCharacters = characters;
        displayCharacters(characters);
      })
      .catch(error => console.error('Error fetching characters:', error));
  }

  // Function to display characters in the character bar
  function displayCharacters(characters) {
    characterBar.innerHTML = '';

    characters.forEach(character => {
      const span = document.createElement('span');
      span.textContent = character.name;
      span.dataset.id = character.id;

      span.addEventListener('click', () => {
        displayCharacterDetails(character);
      });

      characterBar.appendChild(span);
    });
  }

  // Function to display character details
  function displayCharacterDetails(character) {
    currentCharacter = character;

    nameEl.textContent = character.name;
    imageEl.src = character.image;
    imageEl.alt = character.name;
    voteCountEl.textContent = character.votes;
  }
});