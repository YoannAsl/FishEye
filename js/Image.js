class Image {
	createHTML(card, element, i) {
		card.innerHTML = `
			<img src="../assets/images/${element.photographerId}/${element.image}" alt="${element.alt}" onclick="lb.openLightbox(); lb.currentSlide(${i})" tabindex="0">
			<div class="card_text">
				<p class="img_title">${element.alt}</p>
				<div class="price_likes">
					<p class="price">${element.price} €</p>
					<p>
						<span class="likes" id="like_${element.id}">${element.likes}</span> 
						<span><i class="fas fa-heart" id="like_icon_${element.id}" onclick="app.addLike(${element.id})" aria-label="likes" tabindex="0"></i></span>
					</p>
				</div>
			</div>
			`;
	}
}
