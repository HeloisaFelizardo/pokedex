/* Verificamos se o dispositivo suporta eventos de toque (ontouchstart) usando a propriedade 'ontouchstart' in window. Se for um dispositivo de toque, definimos eventType como 'touchstart', caso contrário, como 'click'.

Em seguida, usamos eventType ao adicionar o ouvinte de evento aos itens do menu. Dessa forma, ele será definido como 'touchstart' em dispositivos de toque e como 'click' em outros dispositivos. */

export function configureModalTabs() {
	const isTouchDevice =
		'ontouchstart' in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0;

	const menuItems = document.querySelectorAll('.tab-menu li');
	const tabContents = document.querySelectorAll('.tab-content');

	const eventType = isTouchDevice ? 'touchstart' : 'click';

	menuItems.forEach((item) => {
		item.addEventListener(eventType, () => {
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
}
