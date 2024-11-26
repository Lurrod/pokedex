let currentPokemonId = 1; // Pokémon de départ (Bulbizarre)

// Fonction pour charger les données d'un Pokémon
async function loadPokemon(pokemonId) {
    try {
        const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error("Pokémon introuvable");
        const pokemon = await response.json();

        // Mettre à jour les éléments de l'interface
        document.querySelector('.pokemon-image').src = pokemon.image;
        document.querySelectorAll('.pokemon-name').forEach(el => el.textContent = pokemon.name);

        // Afficher les types
        const typeIconsContainer = document.querySelector('.type-icons');
        typeIconsContainer.innerHTML = ''; // Réinitialiser les icônes
        pokemon.apiTypes.forEach(type => {
            const img = document.createElement('img');
            img.src = type.image;
            img.alt = type.name;
            img.title = type.name;
            typeIconsContainer.appendChild(img);
        });

        // Afficher les statistiques
        const statsList = document.querySelector('.stats-list');
        statsList.innerHTML = ''; // Réinitialiser la liste des stats
        for (const [statName, statValue] of Object.entries(pokemon.stats)) {
            const li = document.createElement('li');
            li.innerHTML = `${statName} : <span>${statValue}</span>`;
            statsList.appendChild(li);
        }
    } catch (error) {
        console.error(error);
    }
}

// Navigation avec le D-pad
document.querySelector('.left').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        loadPokemon(currentPokemonId);
    }
});

document.querySelector('.right').addEventListener('click', () => {
    currentPokemonId++;
    loadPokemon(currentPokemonId);
});

// Charger le Pokémon initial
loadPokemon(currentPokemonId);