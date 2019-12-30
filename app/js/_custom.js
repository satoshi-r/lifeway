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

	// adaptive tabs
	const tabsOpen = document.querySelector('.scientific__menu'),
		tabsClose = document.querySelector('.scientific__tabs-closeBtn button'),
		tabsMenu = document.querySelector('.scientific__tabs'),
		tabsContent = document.querySelector('.tab-content');

	tabsOpen.addEventListener('click', function () {
		tabsMenu.classList.add('tabsOpen')
	});

	tabsClose.addEventListener('click', function () {
		tabsMenu.classList.remove('tabsOpen')
	});

	tabsContent.addEventListener('click', function () {
		tabsMenu.classList.remove('tabsOpen')
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
		popupForm = document.querySelector('#price-form'),
		closeSelectors = [close, overlay, btnClose];

	let popup;

	openBtn.forEach(function (btn) {
		btn.addEventListener("click", function (event) {
			if (event.target.classList.contains('plan-btn')) {
				openModal('.popup-price');
				
				if (event.target.classList.contains('plan1-js')) {
					popupForm.className = 'plan1-js';
				} else if (event.target.classList.contains('plan2-js')) {
					popupForm.className = 'plan2-js';
				} else {
					popupForm.className = 'plan3-js';
				}

			} else if (event.target.classList.contains('reviews-btn')) {
				openModal('.popup-reviews');
			} else {
				openModal('.popup-content');
			}
		})
	});

	function openModal(modal) {
		popup = document.querySelector(modal);
		popup.style.display = "flex";
		document.body.style.overflow = 'hidden';
	} 

	function closePopup() {
		popup.style.display = 'none';
		document.body.style.overflow = '';
		popupForm.className = '';
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
	const sliderReviews = tns({
		container: '.slider',
		items: 1,
		nav: false,
		controlsContainer: '.slider-btn__wrap',
		prevButton: '.prev-btn',
		nextButton: '.next-btn',
		swipeAngle: false,
		
		mode: "carousel",
		responsive: {
			1200: {
				fixedWidth: 720,
				gutter: 300
			},
			992: {
				fixedWidth: 570,
				gutter: 450
			},
			838: {
				fixedWidth: 300,
				gutter: 250
			},
			768: {
				fixedWidth: 300,
				gutter: 200,
				mouseDrag: false,
				controls: true
			},
			576: {
				fixedWidth: 300, 
				edgePadding: -10, // влево
				gutter: 200 // вправо
			},
			480: {
				fixedWidth: 280,
				gutter: 180,
				edgePadding: -30
			},
			320: {
				mouseDrag: true,
				controls: false,
				fixedWidth: 260,
				gutter: 180,
				edgePadding: -110
			}
		}
	});
	// apaptive content section, create slider
	const mediaQuery = window.matchMedia("screen and (max-width: 768px)");
	mediaQuery.addListener(createSliderContent);
	createSliderContent(mediaQuery);

	function createSliderContent(mq) {
		if (mq.matches) {
			const sliderContent = tns({
				container: '.content-wrap',
				controlsContainer: '.content-controls',
				prevButton: '.prev-btn',
				nextButton: '.next-btn',
				items: 1,
				nav: false,
				mouseDrag: true
			});
		}
	}
	

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
	let input = document.querySelector('input[type="tel"]');
	input.addEventListener("input", mask, false);
	input.addEventListener("focus", mask, false);
	input.addEventListener("blur", mask, false);


	//form
	const forms = document.querySelectorAll('form');

	forms.forEach(form => {
		form.onsubmit = function (event) {
			event.preventDefault();

			if (event.target.id == 'price-form') {
				let title;
				if (event.target.className == 'plan1-js') {
					title = 'Иду%20с%20наставником&'
				} else if (event.target.className == 'plan2-js') {
					title = 'Иду%20с%20поддержкой&'
				} else if (event.target.className == 'plan3-js') {
					title = 'Иду%20самостоятельно&'
				}
				console.log(title + serialize(this));
			} else {
				console.log(serialize(this));
			}

			for (const inputs of form) {
				inputs.disabled = true;
			}
		}

	});


});
