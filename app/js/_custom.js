document.addEventListener("DOMContentLoaded", function () {
	// Tabs
	const tab = document.getElementsByClassName('scientific__tabs-item'),
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

	// Accordion
	const acc = document.getElementsByClassName("accordion");

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			this.classList.toggle("active");
			let panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
				setTimeout(() => {
					this.style.marginBottom = '0px';
				}, 200);
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
				this.style.marginBottom = '20px';
			}

		});
	}

	// Modal

	const openBtn = document.querySelectorAll('.open-modal-js'),
		overlay = document.querySelectorAll('.overlay'),
		close = document.querySelectorAll('.popup-close'),
		btnClose = document.querySelectorAll('.module-btn__close'),
		closeSelectors = [close, overlay, btnClose];

	let popup;

	openBtn.forEach(function (btn) {
		btn.addEventListener("click", function (event) {
			if (event.target.classList.contains('plan-btn')) {
				popup = document.querySelector('.popup-price');
				popup.style.display = "flex";
				document.body.style.overflow = 'hidden';

			} else {
				popup = document.querySelector('.popup-content');
				popup.style.display = "flex";
				document.body.style.overflow = 'hidden';
			}
		})
	});

	function closePopup() {
		popup.style.display = 'none';
		document.body.style.overflow = '';
	}

	closeSelectors.forEach(function (arr) {
		arr.forEach(function (selectors) {
			selectors.addEventListener('click', function () {
				closePopup();
			})
		})
	});

	addEventListener("keydown", function (event) {
		if (event.keyCode == 27) {
			event.stopPropagation();
			closePopup();
		}
	});



});
