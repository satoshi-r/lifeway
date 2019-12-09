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

			} else if (event.target.classList.contains('reviews-btn')) {
				popup = document.querySelector('.popup-reviews');
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

	// slider
	const slider = tns({
		container: '.slider',
		items: 1,
		nav: false,
		controlsContainer: '.slider-btn__wrap',
		prevButton: '.prev-btn',
		nextButton: '.next-btn',
		swipeAngle: false,
		fixedWidth: 720,
		gutter: 300,
		mode: "carousel",
	});


	// ScrollTo
	const anchors = document.querySelectorAll('a[href*="#"]')

	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()

			const blockID = anchor.getAttribute('href').substr(1)

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	}

	// mask
	function setCursorPosition(pos, elem) {
		elem.focus();
		if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
		else if (elem.createTextRange) {
			var range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd("character", pos);
			range.moveStart("character", pos);
			range.select()
		}
	}

	function mask(event) {
		var matrix = "+7 (___) ___ ____",
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		if (def.length >= val.length) val = def;
		this.value = matrix.replace(/./g, function (a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		});
		if (event.type == "blur") {
			if (this.value.length == 2) this.value = ""
		} else setCursorPosition(this.value.length, this)
	};
	var input = document.querySelector('input[type="tel"]');
	input.addEventListener("input", mask, false);
	input.addEventListener("focus", mask, false);
	input.addEventListener("blur", mask, false);


	//form
	const priceForm = document.querySelector('#price-form'),
		reviewsForm = document.querySelector('#reviews-form');

	
});
