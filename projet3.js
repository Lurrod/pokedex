let currentPokemonId = 1; // Pokémon de départ (Bulbizarre)

// Aliases pour personnaliser les noms des statistiques
const statAliases = {
    hp: "Points de Vie",
    attack: "Attaque",
    defense: "Défense",
    special_attack: "Attaque Spéciale",
    special_defense: "Défense Spéciale",
    speed: "Vitesse"
};

// Fonction pour charger les statistiques une par une
async function loadPokemonStats(stats) {
    const statsList = document.querySelector('.stats-list');
    statsList.innerHTML = ''; // Réinitialiser la liste des stats

    // Affichage de chaque statistique avec un alias personnalisé
    if (stats.hp !== undefined) {
        const li = document.createElement('li');
        li.innerHTML = `${statAliases.hp} : <span>${stats.hp}</span>`;
        statsList.appendChild(li);
    }

    if (stats.attack !== undefined) {
        const li = document.createElement('li');
        li.innerHTML = `${statAliases.attack} : <span>${stats.attack}</span>`;
        statsList.appendChild(li);
    }

    if (stats.defense !== undefined) {
        const li = document.createElement('li');
        li.innerHTML = `${statAliases.defense} : <span>${stats.defense}</span>`;
        statsList.appendChild(li);
    }

    if (stats.special_attack !== undefined) {
        const li = document.createElement('li');
        li.innerHTML = `${statAliases.special_attack} : <span>${stats.special_attack}</span>`;
        statsList.appendChild(li);
    }

    if (stats.special_defense !== undefined) {
        const li = document.createElement('li');
        li.innerHTML = `${statAliases.special_defense} : <span>${stats.special_defense}</span>`;
        statsList.appendChild(li);
    }

    if (stats.speed !== undefined) {
        const li = document.createElement('li');
        li.innerHTML = `${statAliases.speed} : <span>${stats.speed}</span>`;
        statsList.appendChild(li);
    }
}

// Modification de la fonction `loadPokemon` pour inclure la nouvelle gestion des statistiques
async function loadPokemon(pokemonId) {
    try {
        const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error("Pokémon introuvable");
        const pokemon = await response.json();

        // Mettre à jour l'image et le nom du Pokémon
        document.querySelector('.pokemon-image').src = pokemon.image;
        document.querySelectorAll('.pokemon-name').forEach(el => el.textContent = pokemon.name);

        // Afficher les types
        const typeIconsContainer = document.querySelector('.type-icons');
        typeIconsContainer.innerHTML = '';
        pokemon.apiTypes.forEach(type => {
            const img = document.createElement('img');
            img.src = type.image;
            img.alt = type.name;
            img.title = type.name;
            typeIconsContainer.appendChild(img);
        });

        // Charger les statistiques une par une
        await loadPokemonStats(pokemon.stats);
    } catch (error) {
        console.error(error);
    }
}


// Fonction pour charger un Pokémon aléatoire
async function loadRandomPokemon() {
    try {
        // Générer un ID aléatoire entre 1 et 1010 (nombre approximatif de Pokémon actuellement)
        const randomId = Math.floor(Math.random() * 1010) + 1;
        await loadPokemon(randomId);
    } catch (error) {
        console.error("Erreur lors du chargement d'un Pokémon aléatoire :", error);
    }
}

// Ajouter un événement au bouton bleu
document.querySelector('.big-button').addEventListener('click', () => {
    loadRandomPokemon();
});

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

loadPokemon(currentPokemonId);