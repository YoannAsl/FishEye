class Lightbox {
	constructor(app) {
		this.app = app;
		this.lightbox = document.querySelector('.lightbox');
		this.lightboxContent = document.querySelector('.lightbox_content');
		this.slideIndex = '';
		this.slides = document.getElementsByClassName('lightboxCard');
	}

	updateLightbox() {
		this.lightboxContent.innerHTML = `<span class="fas fa-chevron-left prev" onclick="lb.changeSlide(-1)" aria-label="Previous image" tabindex="0"></span>
        <span class="fas fa-times close" onclick="lb.closeLightbox()" aria-label="Close dialog" tabindex="0"></span>
        <span class="fas fa-chevron-right next" onclick="lb.changeSlide(1)" aria-label="Next image" tabindex="0"></span>`;

		for (let i = 0; i < this.app.gallery.length; i++) {
			const newLightboxCard = document.createElement('div');
			newLightboxCard.className = 'lightboxCard';
			// si le fichier est une image
			if (this.app.gallery[i].image) {
				newLightboxCard.innerHTML = `
                    <img src="images/${this.app.gallery[i].photographerId}/${this.app.gallery[i].image}" alt="${this.app.gallery[i].alt}" tabindex="0">
                    <p class="img_title">${this.app.gallery[i].alt}</p>
                `;
				// si le fichier est une video
			} else if (this.app.gallery[i].video) {
				newLightboxCard.innerHTML = `
                    <video controls class="video" tabindex="0">
                        <source src="images/${this.app.gallery[i].photographerId}/${this.app.gallery[i].video}" type="video/mp4" alt="${this.app.gallery[i].alt}">
                    </video>
                    <p class="img_title">${this.app.gallery[i].alt}</p>
                `;
			}
			this.lightboxContent.append(newLightboxCard);
		}
	}

	currentSlide(n) {
		this.showSlides((this.slideIndex = n));
	}

	showSlides(n) {
		this.slides[n].style.display = 'block';

		// Visibility pour pas déplacer l'image quand l'element disparait
		this.slideIndex == 0
			? (document.querySelector('.prev').style.visibility = 'hidden')
			: (document.querySelector('.prev').style.visibility = 'visible');
		this.slideIndex == this.app.gallery.length - 1
			? (document.querySelector('.next').style.visibility = 'hidden')
			: (document.querySelector('.next').style.visibility = 'visible');
	}

	changeSlide(n) {
		this.resetLightbox();
		this.showSlides((this.slideIndex += n));
	}

	resetLightbox() {
		for (let i = 0; i < this.slides.length; i++) {
			this.slides[i].style.display = 'none';
		}
	}

	openLightbox() {
		this.lightbox.style.display = 'flex';
		document.querySelector('.lightboxCard video').focus();
	}

	closeLightbox() {
		this.lightbox.style.display = 'none';
		this.resetLightbox();
	}
}
