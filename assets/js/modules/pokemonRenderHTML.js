import { pokeApi } from './pokeApi.js';
import { configureModalTabs } from './tabMenu.js';

export default function pokemonRenderHTML() {
	const pokemonList = document.getElementById('pokemonList');
	const loadMoreButton = document.getElementById('loadMoreButton');

	const maxRecords = 151;
	const limit = 10;
	let offset = 0;

	function convertPokemonToLi(pokemon) {
		return `
        <li class="pokemon ${pokemon.type}" data-pokemon-id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
						.map((type) => `<li class="type ${type}">${type}</li>`)
						.join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
	}

	let activeModal;

	function openPokemonModal(event) {
		const liElement = event.currentTarget;
		const pokemonId = liElement.dataset.pokemonId;
		const pokemon = {
			url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
		};

		pokeApi.getPokemonDetail(pokemon).then((pokemon) => {
			// Criar o elemento do modal dinamicamente
			console.log(pokemon);
			const modal = document.createElement('div');
			modal.classList.add('modal');
			modal.id = `modal-${pokemonId}`;
			//Soma dos stats
			let soma = 0;
			for (let key in pokemon.baseStats) {
				soma += pokemon.baseStats[key];
			}
			// Configurar o conteúdo do modal, como título, imagem, etc.
			modal.innerHTML = `
			<section class="pokemonDetail ${pokemon.type}">
				<button class="close-button" data-pokemon-id="${pokemonId}">X</button>

				<h1 class="name">${pokemon.name}</h1>
				<span class="number">#${pokemon.number}</span>

				<ol class="types">
				${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
				</ol>
				<img src="${pokemon.photo}"
						alt="${pokemon.name}">

				<div class="box-details">
					<ol class="types tab-menu">
						<li id="about" data-tab="tab1" class="active">About</li>
						<li id="base-stats" data-tab="tab2">Base Stats</li>
					</ol>
					<div class="line"></div>
					<div id="tab1" class="tab-content">
						<ol class="table">
							<li class="table-row">
								<div class="table-cell">Habitat</div>
								<div class="table-cell medium">${pokemon.habitat}</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Height</div>
								<div class="table-cell medium">${pokemon.height}</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Weight</div>
								<div class="table-cell medium"> ${pokemon.weight}</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Abilities</div>
								<div class="table-cell medium">${pokemon.abilities}</div>
							</li>
						</ol>

						<h3>Breeding</h3>

						<ol class="table">
							<li class="table-row">
								<div class="table-cell">Gender</div>
								<div class="table-cell medium">
									<span>♂</span> ${pokemon.gender.male}  <span>♀</span> ${pokemon.gender.female} 
								</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Egg Groups</div>
								<div class="table-cell medium">${pokemon.eggGroups}</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Egg Cycle</div>
								<div class="table-cell medium">${pokemon.eggCycle} Steps</div>
							</li>
						</ol>
					</div>

					<div id="tab2" class="tab-content">
						<ol class="table">
							<li class="table-row">
								<div class="table-cell">HP</div>
								<div class="table-cell medium">${pokemon.baseStats.hp}</div>
								<div class="table-cell medium">
									<div class="status-bar">
										<progress class="status"  max="255" 
											value="${pokemon.baseStats.hp}">
										</progress>
									</div>
								</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Attack</div>
								<div class="table-cell medium">${pokemon.baseStats.attack}</div>
								<div class="table-cell medium">
									<div class="status-bar">
										<progress class="status"  max="255" 
											value="${pokemon.baseStats.attack}">
										</progress>
									</div>
								</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Defense</div>
								<div class="table-cell medium">${pokemon.baseStats.defense}</div>
								<div class="table-cell medium">
									<div class="status-bar">
										<progress class="status"  max="255" 
											value="${pokemon.baseStats.defense}">
										</progress>
									</div>
								</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Sp. Atk</div>
								<div class="table-cell medium">${pokemon.baseStats.specialAttack}</div>
								<div class="table-cell medium">
									<div class="status-bar">
										<progress class="status"  max="255" 
											value="${pokemon.baseStats.specialAttack}">
										</progress>
									</div>
								</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Sp. Def</div>
								<div class="table-cell medium">${pokemon.baseStats.specialDefense}</div>
								<div class="table-cell medium">
									<div class="status-bar">
										<progress class="status"  max="255" 
											value="${pokemon.baseStats.specialDefense}">
										</progress>
									</div>
								</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Speed</div>
								<div class="table-cell medium">${pokemon.baseStats.speed}</div>
								<div class="table-cell medium">
									<div class="status-bar">
										<progress class="status"  max="255" 
											value="${pokemon.baseStats.speed}">
										</progress>
									</div>
								</div>
							</li>
							<li class="table-row">
								<div class="table-cell">Total</div>
								<div class="table-cell medium">${soma}</div>
								<div class="table-cell medium">
									<div class="status-bar">
										<progress class="status" max="600" value="${soma}"></progress>
									</div>
								</div>
							</li>
						</ol>

						<h3>Types Defense</h3>
						<p>Types effectiveness of each type on Charmander</p>
					</div>
				</div>
			</section>
			`;

			// Adicionar o modal ao DOM
			document.body.appendChild(modal);

			// Adicionar a classe 'show' após um pequeno atraso para acionar a transição
			setTimeout(function () {
				modal.classList.add('show');
			}, 10);

			configureModalTabs();
			console.log(modal);

			if (activeModal) {
				const previousCloseButton =
					activeModal.querySelector('.close-button');
				previousCloseButton.removeEventListener(
					'click',
					closePokemonModal
				);
			}

			// Definir o modal atual como o modal ativo
			activeModal = modal;

			// Encontre o botão de fechamento dentro do modal
			const closeButton = modal.querySelector('.close-button');

			// Adicione o evento de clique ao botão de fechamento
			closeButton.addEventListener('click', closePokemonModal);

			// Calcula a altura do conteúdo do modal
			const modalContent = modal.querySelector('.pokemonDetail');
			const contentHeight = modalContent.offsetHeight;

			// Verifica se a altura do conteúdo ultrapassa a altura da tela
			const windowHeight = window.innerHeight;
			if (contentHeight > windowHeight) {
				// Define a altura máxima do conteúdo para ser igual à altura da tela - um valor de margem
				const maxHeight = windowHeight - 40; // Ajuste o valor da margem conforme necessário
				modalContent.style.maxHeight = `${maxHeight}px`;
				modalContent.style.overflowY = 'auto';
			}
		});
	}

	function closePokemonModal(event) {
		// Obtenha o botão de fechamento que foi clicado
		const closeButton = event.target;

		// Obtenha o número do Pokémon a partir do atributo data-pokemon-id do botão de fechamento
		const pokemonId = closeButton.dataset.pokemonId;

		// Encontre o elemento do modal correspondente ao número do Pokémon
		const modal = document.querySelector(`[id="modal-${pokemonId}"]`);
		console.log(modal);

		// Remova o modal do DOM para ocultá-lo completamente
		modal.remove();
	}

	function loadPokemonItens(offset, limit) {
		pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
			const newHtml = pokemons.map(convertPokemonToLi).join('');
			pokemonList.innerHTML += newHtml;

			// Selecionar todas as <li> geradas
			const pokemonItems = pokemonList.querySelectorAll('.pokemon');
			pokemonItems.forEach((item) => {
				item.addEventListener('click', openPokemonModal);
			});
		});
	}

	loadPokemonItens(offset, limit);

	loadMoreButton.addEventListener('click', () => {
		offset += limit;
		const qtdRecordsWithNexPage = offset + limit;

		if (qtdRecordsWithNexPage >= maxRecords) {
			const newLimit = maxRecords - offset;
			loadPokemonItens(offset, newLimit);

			loadMoreButton.parentElement.removeChild(loadMoreButton);
		} else {
			loadPokemonItens(offset, limit);
		}
	});
}
