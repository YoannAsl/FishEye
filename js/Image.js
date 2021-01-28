class Image {
	constructor() {
		this.createHTML = (card, element, i) => {
			card.innerHTML = `
			<img src="images/${element.photographerId}/${element.image}" alt="${element.title}" onclick="lb.openLightbox(); lb.currentSlide(${i})">
			<div class="card_text">
				<p class="img_title">${element.title}</p>
				<div class="price_likes">
					<p class="price">${element.price} €</p>
					<p>
						<span class="likes" id="like_${element.id}">${element.likes}</span> 
						<i class="fas fa-heart" onclick="app.addLike(${element.id})"></i>
					</p>
				</div>
			</div>
			`;
		};
	}
}
