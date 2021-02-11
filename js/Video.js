class Video {
	constructor() {
		this.createHTML = (card, element, i) => {
			card.innerHTML = `
			<video alt="${element.alt}" onclick="lb.openLightbox(); lb.currentSlide(${i})">
				<source src="images/${element.photographerId}/${element.video}" type="video/mp4">
			</video>
			<div class="card_text">
				<p class="img_title">${element.alt}</p>
				<div class="price_likes">
					<p class="price">${element.price} €</p>
					<p>
						<span class="likes" id="like_${element.id}">${element.likes}</span> 
						<i class="fas fa-heart" onclick="app.addLike(${element.id})" aria-label="likes"></i>
					</p>
				</div>
			</div>
			`;
		};
	}
}
