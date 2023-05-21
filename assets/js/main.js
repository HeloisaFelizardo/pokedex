const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 10;
let offset = 0;

/* 1, 2, 3, 4, 5,        0 - 5
6, 7, 8, 9, 10,       5 - 5
11,                   10 - 5 (remove o botão) */

const loadPokemonItens = (offset, limit) => {
	/* Interface de uma Promisse */
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		//Incrementando a lista de pokemons no HTML
		pokemonList.innerHTML += pokemons
			.map((pokemon) => {
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
			})
			.join('');
	});
};

loadPokemonItens(offset, limit);

//Carregar mais itens ao clicar no botão
loadMoreButton.addEventListener('click', () => {
	offset += limit;

	//Limitar o número de itens da paginação
	const qtdRecordsWithNextPage = offset + limit;

	if (qtdRecordsWithNextPage >= maxRecords) {
		const newLimit = maxRecords - offset;
		loadPokemonItens(offset, newLimit);
		//remover o botão ao chegar no limite de itens <maxRecords>
		loadMoreButton.parentElement.removeChild(loadMoreButton);
	} else {
		loadPokemonItens(offset, limit);
	}
});
