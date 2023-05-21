//Criando o objeto PokeApi
const pokeApi = {};

//Convertendo os detalhes do Poke Api para nosso modelo
const convertPokeApiDetailToPokemon = (pokeDetail) => {
	const pokemon = new Pokemon();

	pokemon.number = pokeDetail.id;
	pokemon.name = pokeDetail.name;

	const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
	const [type] = types;

	pokemon.types = types;
	pokemon.type = type;

	pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

	return pokemon;
};

//Requisição da lista de detalhes do pokemon em json
pokeApi.getPokemonDetail = (pokemon) =>
	fetch(pokemon.url)
		.then((response) => response.json())
		.then(convertPokeApiDetailToPokemon);

//Requisição da url da Poke Api
pokeApi.getPokemons = (offset = 0, limit = 5) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

	return fetch(url)
		.then((reponse) => reponse.json())
		.then((jsonBody) => jsonBody.results)
		.then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
		.then((detailRequests) => Promise.all(detailRequests))
		.then((pokemonDetails) => pokemonDetails);
};

/* Promise.all([
	fetch('https://pokeapi.co/api/v2/pokemon/1'),
	fetch('https://pokeapi.co/api/v2/pokemon/2'),
	fetch('https://pokeapi.co/api/v2/pokemon/3'),
	fetch('https://pokeapi.co/api/v2/pokemon/4'),
	fetch('https://pokeapi.co/api/v2/pokemon/5'),
	fetch('https://pokeapi.co/api/v2/pokemon/6'),
]).then((results) => {
	console.log(results);
}); */
