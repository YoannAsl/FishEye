class Index {
	constructor() {
		this.phList = [];
		this.ajax = new Ajax();

		this.cardsContainer = document.querySelector('.cards_container');
		this.tagsContainer = document.querySelector('.tags');
		this.linkToMain = document.querySelector('#linktomain');
	}

	async init() {
		const data = await this.ajax.getData();
		data.photographers.forEach((e) => {
			this.phList.push(e);
		});
		this.createCards();
		window.addEventListener('scroll', this.showDivOnScroll);
	}

	createCards() {
		this.phList.forEach((e) => {
			let listTag = '';
			e.tags.map((e) => {
				listTag += `<a class="tag" href="#" onclick="index.updatePhList(this.children[0].innerHTML)">#<span aria-label="${e}">${e}</span></a>`;
			});

			const newCard = document.createElement('article');

			let url = './photographer.html';
			url = url + '?id=' + e.id;

			newCard.className = 'card';
			newCard.innerHTML = `
                <a href="${url}" aria-label="${e.name}">
                    <img src="../assets/images/Photographers_ID_Photos/${e.portrait}">
                    <h2>${e.name}</h2>
                </a>
                <p class="location">${e.city}, ${e.country}</p>
                <p>${e.tagline}</p>
                <p class="price">${e.price}€/jour</p>
                <div class="tags">
                    ${listTag}
                </div>
            `;
			this.cardsContainer.append(newCard);
		});
	}

	async updatePhList(tag) {
		const data = await this.ajax.getData();
		this.phList = [];

		data.photographers.forEach((e) => {
			if (e.tags.includes(tag.toLowerCase())) {
				this.phList.push(e);
			}
		});
		this.cardsContainer.innerHTML = '';
		this.createCards();
	}

	showDivOnScroll() {
		window.scrollY >= 200
			? (this.linktomain.style.display = 'block')
			: (this.linktomain.style.display = 'none');
	}
}
