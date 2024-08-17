const containerElement = document.getElementsByClassName("container")[0];
const spinner = document.getElementById("spinner");

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then((data) => {
            createPokemon(data);
            spinner.style.display = "none";
        })
        .catch(error => console.error('Error fetching the Pokémon:', error));
}

function fetchPokemons(number) {
    spinner.style.display = "block";
    for (let i = 1; i <= number; i++) {
        fetchPokemon(i);
    }
}

function createPokemon(pokemon) {
    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("pokemon-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
    spriteContainer.appendChild(sprite);

    const numberElement = document.createElement("p");
    numberElement.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

    const nameElement = document.createElement("p");
    nameElement.classList.add("name");
    nameElement.textContent = pokemon.name;

    const btnInfo = document.createElement("button");
    btnInfo.classList.add("btn", "btn-primary", "mt-2");
    btnInfo.textContent = "Más información";
    card.append(btnInfo);


    btnInfo.addEventListener("click", () => {
        showPokemonDetails(pokemon);
    });

    card.appendChild(spriteContainer);
    card.appendChild(numberElement);
    card.appendChild(nameElement);
    

    containerElement.appendChild(card);
}

function showPokemonDetails(pokemon) {
    const types = pokemon.types.map(type => type.type.name).join(", ");
    const ability = pokemon.abilities.length > 0 ? pokemon.abilities[0].ability.name : "Desconocida";
    const moves = pokemon.moves.slice(0, 4).map(move => move.move.name).join(", ");
    alert(`Nombre: ${pokemon.name}
          Tipos: ${types}
          Habilidad: ${ability}
         Movimientos: ${moves}`);
}

fetchPokemons(151);

const cargarMasPokemons = document.createElement("button");
cargarMasPokemons.textContent = "Cargar más Pokémon";
cargarMasPokemons.classList.add("btn", "btn-primary");
cargarMasPokemons.addEventListener("click", () => {
    const currentCount = containerElement.childElementCount;
    fetchPokemons(currentCount + 20);
});

containerElement.appendChild(cargarMasPokemons);
