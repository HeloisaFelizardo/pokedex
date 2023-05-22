const menuItems = document.querySelectorAll('.tab-menu li');
const tabContents = document.querySelectorAll('.tab-content');

menuItems.forEach((item) => {
	item.addEventListener('click', () => {
		const tabId = item.getAttribute('data-tab');

		// Remove a classe "active" de todos os itens do menu e conteúdos
		menuItems.forEach((item) => item.classList.remove('active'));
		tabContents.forEach((content) => content.classList.remove('show'));

		// Adiciona a classe "active" ao item do menu clicado
		item.classList.add('active');

		// Exibe o conteúdo da aba correspondente
		document.getElementById(tabId).classList.add('show');
	});
});

// Inicia com o primeiro item do menu ativo e exibe o conteúdo correspondente
menuItems[0].classList.add('active');
document.getElementById('tab1').classList.add('show');
