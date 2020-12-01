class Lightbox {
    constructor() {
        this.lightbox = document.querySelector(".lightbox");
        this.lightboxContent = document.querySelector(".lightbox_content");
        this.slideIndex = "";
        this.slides = document.getElementsByClassName("lightboxCard");
        this.prev = document.querySelector(".prev");
        this.next = document.querySelector(".next");
        console.log(this.slides)
    }

    updateLightbox() {
        this.lightboxContent.innerHTML = "";
        for (let i = 0; i < app.gallery.length; i++) {
            const newLightboxCard = document.createElement("div");
            newLightboxCard.className = "lightboxCard";
            // si le fichier est une image
            if (app.gallery[i].image) {
                newLightboxCard.innerHTML = `
                    <img src="images/${app.gallery[i].photographerId}/${app.gallery[i].image}">
                `
            // si le fichier est une video
            } else if (app.gallery[i].video) {
                newLightboxCard.innerHTML = `
                    <video controls>
                        <source src="images/${app.gallery[i].photographerId}/${app.gallery[i].video}" type="video/mp4">
                    </video>
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
        this.slideIndex == app.gallery.length - 1 ? this.next.style.visibility = "hidden" : this.next.style.visibility = "visible";
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