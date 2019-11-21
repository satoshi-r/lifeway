document.addEventListener("DOMContentLoaded", function () {

	let tab = document.getElementsByClassName('scientific__tabs-item'),
		tabContent = document.getElementsByClassName('tab-content'),
		info = document.getElementsByClassName('scientific__tabs')[0];

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function (event) {
		let target = event.target;
		if (target.className == 'scientific__tabs-item') {
			for (let i = 0; i < tab.length; i++) {
				tab[i].classList.remove('focus');
				if (target == tab[i]) {
					target.classList.add('focus');
					showTabContent(i);
					// break;
				}
			}
		}
		
	});

});
