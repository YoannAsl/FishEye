class Photographers {
    constructor() {
        this.gallery = [];
        this.ajax = new Ajax;
        
        this.header = document.querySelector("header");
        this.cardsContainer = document.querySelector(".cards_container");
        this.modal = document.querySelector(".modal");
        this.likesCount = document.getElementsByClassName(".likes");
        this.queryString = window.location.search;
        this.urlParams = new URLSearchParams(this.queryString);
        this.id = this.urlParams.get("id");
        // this.selector = document.querySelector("#selector");
        this.selector = document.querySelector(".selected");

        this.lightbox = document.querySelector(".lightbox");
        this.lightboxContent = document.querySelector(".lightbox_content");
        this.slideIndex = "1";
        this.slides = document.getElementsByClassName("lightboxCard");
        this.prev = document.querySelector(".prev");
        this.next = document.querySelector(".next");
    }

    async createHeader() {
        const data = await this.ajax.getData();
        const photographers = data.photographers;
        for (let i = 0; i < photographers.length; i++) {
            if (photographers[i].id == this.id) {
                const ph = photographers[i];
                const headerContent = document.createElement("div");

                let listTag = "" ;
                ph.tags.map(tag => {
                    listTag += `<a class="tag" href="#"><span>#${tag}</span></a>`;
                });
                
                headerContent.innerHTML = `
                    <div class="top_content">
                        <h1>${ph.name}</h1>
                        <button onclick="app.openFormModal()">Contactez-moi</button>
                    </div>
                    <p class="location">${ph.city}, ${ph.country}</p>
                    <p class="tagline">${ph.tagline}</p>
                    <div class="tags">
                        ${listTag}
                    </div>
                `;
                const profilePic = document.createElement("img");
                profilePic.src = `./images/Photographers_ID_Photos/${ph.portrait}`;
                this.header.append(headerContent, profilePic);

                const modalName = document.querySelector("#modal_name");
                modalName.innerHTML = `${ph.name}`;
            }
        } 
    }

    async createImages() {
        const data = await this.ajax.getData();

        data.media.forEach(e => {
            if (e.photographerId == this.id) {
                this.gallery.push(e);
            }
        });

        this.sortGallery();
        // console.log(this.gallery);
    }
    
    updateGallery() {
        this.cardsContainer.innerHTML = "";
        for (let i = 0; i < this.gallery.length; i++) {
            const newCard = document.createElement("div");
            newCard.className = "card";
            // si le fichier est une image
            if (this.gallery[i].image) {
                newCard.innerHTML = `
                <img src="images/${this.gallery[i].photographerId}/${this.gallery[i].image}" onclick="app.openLightbox(); app.currentSlide(${i})">
                    <div class="card_text">
                        <div class="price">${this.gallery[i].price} €</div>
                        <div><span class="likes">${this.gallery[i].likes}</span> <i class="fas fa-heart" onclick="app.addLike(${this.gallery[i].likes})"></i></div>
                    </div>
                `
            // si le fichier est une video
            } else if (this.gallery[i].video) {
                newCard.innerHTML = `
                <video controls>
                    <source src="images/${this.gallery[i].photographerId}/${this.gallery[i].video}" type="video/mp4">
                </video>
                <div class="card_text">
                    <div class="price">${this.gallery[i].price} €</div>
                    <div><span class="likes">${this.gallery[i].likes}</span> <i class="fas fa-heart" onclick="app.addLike(${this.likesCount})"></i></div>
                </div>
            `
            }
            this.cardsContainer.append(newCard);
        }
    }

    sortGalleryArray() {
        switch (this.selector.value) {
            case "popularité": 
                this.gallery.sort((a, b) => {
                    // b avant a pour ordre décroissant
                    return b.likes - a.likes;
                });
                break;
            case "date":
                this.gallery.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
                break;
            case "titre":
                this.gallery.sort((a, b) => a.image.localeCompare(b.image))
                break;
        }
    }
    
    sortGallery() {
        this.sortGalleryArray();
        this.updateGallery();
        this.updateLightbox();
        // console.log(this.gallery);
    }

    updateLightbox() {
        this.lightboxContent.innerHTML = "";
        for (let i = 0; i < this.gallery.length; i++) {
            // console.log(i);
            const newLightboxCard = document.createElement("div");
            newLightboxCard.className = "lightboxCard";
            // si le fichier est une image
            if (this.gallery[i].image) {
                newLightboxCard.innerHTML = `
                <img src="images/${this.gallery[i].photographerId}/${this.gallery[i].image}">
                `
            // si le fichier est une video
            } else if (this.gallery[i].video) {
                newLightboxCard.innerHTML = `
                    <video controls>
                        <source src="images/${this.gallery[i].photographerId}/${this.gallery[i].video}" type="video/mp4">
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
        // console.log(this.slideIndex);
        this.slides[n].style.display = "block";
        this.slideIndex == 0 ? this.prev.style.display = "none" : this.prev.style.display = "block";
        this.slideIndex == this.gallery.length - 1 ? this.next.style.display = "none" : this.next.style.display = "block";
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

    addLike(tag) {
        // tag++;
        console.log(this.likesCount.innerHTML);
    }

    openFormModal() {
        this.modal.style.display = "block";
    }

    closeFormModal() {
        this.modal.style.display = "none";
    }

    openLightbox() {
        this.lightbox.style.display = "block";
    }

    closeLightbox() {
        this.lightbox.style.display = "none";
        this.resetLightbox();
    }
}