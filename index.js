class Index {
    constructor()  {
        this.phList = [];
        this.ajax = new Ajax;
        
        this.cardsContainer = document.querySelector(".cards_container");
        this.tagsContainer = document.querySelector(".tags");
    }

    // async createCards() {
    //     const data = await this.ajax.getData();
    //     data.photographers.forEach(e => {
    //         let listTag = "" ;
    //         e.tags.map(e => {
    //             listTag += `<a class="tag ${e}" href="#"><span>#${e}</span></a>`;
    //         });

    //         const newCard = document.createElement("div");

    //         let url = "./photographer.html";
    //         url = url + "?id=" + e.id;
    //         newCard.className = "card";
    //         newCard.innerHTML = `
    //             <a href="${url}">
    //                 <img src="images/Photographers_ID_Photos/${e.portrait}">
    //                 <h2>${e.name}</h2>
    //             </a>
    //             <p class="location">${e.city}, ${e.country}</p>
    //             <p>${e.tagline}</p>
    //             <p class="price">${e.price}€/jour</p>
    //             <div class="tags">
    //                 ${listTag}
    //             </div>
    //         `;
    //         this.cardsContainer.append(newCard);
    //     });
    // }
    async init() {
        const data = await this.ajax.getData();
        data.photographers.forEach(e => {
            this.phList.push(e);
        });
        this.createCards()
    }

    createCards() {
        this.phList.forEach(e => {
            let listTag = "" ;
            e.tags.map(e => {
                listTag += `<a class="tag ${e}" href="#"><span>#${e}</span></a>`;
            });

            const newCard = document.createElement("div");

            let url = "./photographer.html";
            url = url + "?id=" + e.id;
            
            newCard.className = "card";
            newCard.innerHTML = `
                <a href="${url}">
                    <img src="images/Photographers_ID_Photos/${e.portrait}">
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
        })
    }

    async updatePhList(tag) {
        const data = await this.ajax.getData();
        this.phList = [];

        data.photographers.forEach(e => {
            if (e.tags.includes(tag.toLowerCase())) {
                this.phList.push(e);
            }
        });
        this.cardsContainer.innerHTML = "";
        this.createCards();
    }
}