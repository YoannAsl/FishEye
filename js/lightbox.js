class Lightbox {
    constructor(app) {
        this.app = app;
        this.lightbox = document.querySelector(".lightbox");
        this.lightboxContent = document.querySelector(".lightbox_content");
        this.slideIndex = "";
        this.slides = document.getElementsByClassName("lightboxCard");
        this.prev = document.querySelector(".prev");
        this.next = document.querySelector(".next");
    }

    updateLightbox() {
        this.lightboxContent.innerHTML = "";
        for (let i = 0; i < this.app.gallery.length; i++) {
            const newLightboxCard = document.createElement("div");
            newLightboxCard.className = "lightboxCard";
            // si le fichier est une image
            if (this.app.gallery[i].image) {
                newLightboxCard.innerHTML = `
                    <img src="images/${this.app.gallery[i].photographerId}/${this.app.gallery[i].image}">
                    <p class="img_title">${this.app.gallery[i].title}</p>
                `
            // si le fichier est une video
            } else if (this.app.gallery[i].video) {
                newLightboxCard.innerHTML = `
                    <video controls>
                        <source src="images/${this.app.gallery[i].photographerId}/${this.app.gallery[i].video}" type="video/mp4">
                    </video>
                    <p class="img_title">${this.app.gallery[i].title}</p>
                `
            }
            this.lightboxContent.append(newLightboxCard);
        }
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    showSlides(n) {
        this.slides[n].style.display = "block";
        // Visibility pour pas déplacer l'image quand l'element disparait
        this.slideIndex == 0 ? this.prev.style.visibility = "hidden" : this.prev.style.visibility = "visible";
        this.slideIndex == this.app.gallery.length - 1 ? this.next.style.visibility = "hidden" : this.next.style.visibility = "visible";
    }

    changeSlide(n) {
        this.resetLightbox();
        this.showSlides(this.slideIndex += n);
    }

    resetLightbox() {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = "none";
        }
    }
    
    openLightbox() {
        this.lightbox.style.display = "flex";
    }

    closeLightbox() {
        this.lightbox.style.display = "none";
        this.resetLightbox();
    }
}