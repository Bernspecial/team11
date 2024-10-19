// Define the URL for the Pokémon API
const url = 'https://pokeapi.co/api/v2/pokemon?limit=20'; // Get 10 Pokémon characters

// Function to fetch Pokémon data
function getPokemon(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => doStuff(data.results)) // Pass the Pokémon results to doStuff
    .catch((error) => console.error('Error fetching Pokémon:', error));
}

// Function to handle the Pokémon data and display in <select>
function doStuff(data) {
  const selectElement = document.getElementById('pokemonSelect'); // Get the select element
  data.forEach((pokemon) => {
    const option = document.createElement('option'); // Create a new option element
    option.value = pokemon.name; // Set the value of the option to Pokémon name
    option.textContent = pokemon.name; // Set the displayed text to Pokémon name
    selectElement.appendChild(option); // Append the option to the select element
  });
  console.log("Pokemon list:", data); // Log the Pokémon data
}

// Call the getPokemon function
getPokemon(url);
