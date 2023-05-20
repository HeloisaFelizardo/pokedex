const convertPokemonToLi = (pokemon) => {
	return `
		<li class="pokemon ${pokemon.type}">
			<span class="number">#${pokemon.number}</span>
			<h2 class="name">${pokemon.name}</h2>

		<div class="detail">
			<ol class="types">
			${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
				
			</ol>
			<img src="${pokemon.photo}"
			 alt="${pokemon.name}"
			/>
		</div>
		</li>
	`;
};

const pokemonList = document.getElementById('pokemonList');

/* Interface de uma Promisse */
pokeApi.getPokemons().then((pokemons = []) => {
	const newHTML = pokemons.map(convertPokemonToLi).join('');
	pokemonList.innerHTML = newHTML;
});
