const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');
const maxPokemons = 1025;
let limit = 24;
let offset = 0;

function loadMorePokemons(offset = 0, limit = 251){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.id.toString().padStart(4, '0')}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
                </div>
            </li>
        `).join('');
    })
}

loadMorePokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const totalPokemons = offset + limit;
    if (totalPokemons >= maxPokemons){
        const newLimit = maxPokemons - offset;
        loadMorePokemons(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadMorePokemons(offset, limit);
    }
});