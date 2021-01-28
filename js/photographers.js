class Photographers {
	constructor() {
		this.gallery = [];
		this.ajax = new Ajax();
		this.factory = new MediaFactory();
		this.main = document.querySelector('main');
		this.cardsContainer = document.querySelector('.cards_container');
		this.modal = document.querySelector('.modal');
		this.likesCount = document.getElementsByClassName('.likes');
		this.queryString = window.location.search;
		this.urlParams = new URLSearchParams(this.queryString);
		this.id = this.urlParams.get('id');
		this.selector = document.querySelector('#selector');
		this.bottomDiv = document.querySelector('.bottom_div');
		this.photographer = '';
	}

	init() {
		this.createBanner();
		this.createImages();
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				this.closeFormModal();
				lb.closeLightbox();
			}
			if (e.key === 'ArrowLeft' && lb.prev.style.visibility == 'visible') {
				lb.changeSlide(-1);
			}
			if (e.key === 'ArrowRight' && lb.next.style.visibility == 'visible') {
				lb.changeSlide(1);
			}
		});

		for (const option of document.querySelectorAll('.option')) {
			option.addEventListener('click', function () {
				if (!this.classList.contains('selected')) {
					this.parentNode
						.querySelector('.option.selected')
						.classList.remove('selected');
					this.classList.add('selected');
					this.closest('.select').querySelector(
						'.select_trigger span'
					).textContent = this.textContent;
				}
				app.sortGallery();
				lb.updateLightbox();
			});
		}

		document
			.querySelector('.select_wrapper')
			.addEventListener('click', function () {
				this.querySelector('.select').classList.toggle('open');
			});

		window.addEventListener('click', function (e) {
			const select = document.querySelector('.select');
			if (!select.contains(e.target)) {
				select.classList.remove('open');
			}
		});

		document
			.querySelector('#submit_button')
			.addEventListener('click', (event) => {
				event.preventDefault();
				console.log(
					document.querySelector('#prenom').value,
					document.querySelector('#nom').value,
					document.querySelector('#message').value
				);
			});
	}

	async createBanner() {
		const data = await this.ajax.getData();
		const photographers = data.photographers;
		for (let i = 0; i < photographers.length; i++) {
			if (photographers[i].id == this.id) {
				const ph = photographers[i];
				const bannerContent = document.createElement('div');
				let listTag = '';
				this.photographer = ph;
				bannerContent.className = 'banner';

				ph.tags.map((tag) => {
					listTag += `<a class="tag" href="#"><span aria-label="tag">#${tag}</span></a>`;
				});

				bannerContent.innerHTML = `
                    <div>
                        <div class="top_content">
                            <h1>${ph.name}</h1>
                            <button aria-label="Contact me" onclick="app.openFormModal()">Contactez-moi</button>
                        </div>
                        <p class="location">${ph.city}, ${ph.country}</p>
                        <p class="tagline">${ph.tagline}</p>
                        <div class="tags">
                            ${listTag}
                        </div>
                    </div>
                    <img src="./images/Photographers_ID_Photos/${ph.portrait}" alt="" />
                `;

				this.main.prepend(bannerContent);

				const modalName = document.querySelector('#modal_name');
				modalName.innerHTML = `${ph.name}`;
			}
		}
	}

	async createImages() {
		const data = await this.ajax.getData();
		data.media.forEach((e) => {
			if (e.photographerId == this.id) {
				this.gallery.push(e);
			}
		});
		this.sortGallery();
	}

	updateGallery() {
		this.cardsContainer.innerHTML = '';
		for (let i = 0; i < this.gallery.length; i++) {
			const newCard = document.createElement('div');
			newCard.className = 'card';
			// si le fichier est une image
			if (this.gallery[i].image) {
				this.factory
					.createMedia('image')
					.createHTML(newCard, this.gallery[i], i);

				// si le fichier est une video
			} else if (this.gallery[i].video) {
				this.factory
					.createMedia('video')
					.createHTML(newCard, this.gallery[i], i);
			}
			this.cardsContainer.append(newCard);
		}
	}

	sortGalleryArray() {
		switch (this.selector.innerHTML) {
			case 'Popularité':
				this.gallery.sort((a, b) => {
					// b avant a pour ordre décroissant
					return b.likes - a.likes;
				});
				break;
			case 'Date':
				this.gallery.sort((a, b) => {
					return new Date(b.date) - new Date(a.date);
				});
				break;
			case 'Titre':
				this.gallery.sort((a, b) => a.title.localeCompare(b.title));
				break;
		}
	}

	sortGallery() {
		this.sortGalleryArray();
		this.updateGallery();
		lb.updateLightbox();
		this.createBottomDiv();
	}

	createBottomDiv() {
		let totalLikes = 0;
		this.gallery.forEach((l) => {
			totalLikes += l.likes;
		});
		this.bottomDiv.innerHTML = `
            <p><span id="totalLikes">${totalLikes}</span> <i class="fas fa-heart""></i></p>
            <p>${this.photographer.price}€ / jour</p>
        `;
	}

	addLike(tag) {
		let tagselect = document.querySelector(`#like_${tag}`);
		let nbLikes = parseInt(tagselect.textContent);
		nbLikes += 1;
		tagselect.textContent = nbLikes;

		let totalLikesSelector = document.querySelector('#totalLikes');
		totalLikesSelector.innerHTML++;
	}

	openFormModal() {
		this.modal.style.display = 'block';
	}

	closeFormModal() {
		this.modal.style.display = 'none';
	}
}
