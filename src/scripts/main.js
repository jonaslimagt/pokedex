const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');
let limit = 12;
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
    loadMorePokemons(offset, limit);
});