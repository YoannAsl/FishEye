const header = document.querySelector("header");
const cardsContainer = document.querySelector(".cards_container");
const modal = document.querySelector(".modal");
const likes = document.getElementsByClassName(".likes");

const getData = async () => {
    try {
        const res = await axios.get("./data.json");
        return res.data;
    } catch(e) {
        console.log(e);
    }
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const createContent = async () => {
    const data = await getData();
    const photographers = data.photographers;
    for (let i = 0; i < photographers.length; i++) {
        if (photographers[i].id == id) {
            const ph = photographers[i];
            const headerContent = document.createElement("div");

            let listTag = "" ;
            ph.tags.map(tag => {
                listTag += `<a class="tag" href="#"><span>#${tag}</span></a>`;
            });
            
            headerContent.innerHTML = `
                <div class="top_content">
                    <h1>${ph.name}</h1>
                    <button onclick="openFormModal()">Contactez-moi</button>
                </div>
                <p class="location">${ph.city}, ${ph.country}</p>
                <p class="tagline">${ph.tagline}</p>
                <div class="tags">
                    ${listTag}
                </div>
            `;
            const profilePic = document.createElement("img");
            profilePic.src = `./images/Photographers ID Photos/${ph.portrait}`;
            header.append(headerContent, profilePic);

            data.media.forEach(e => {
                // !== undefined pour ne pas afficher les videos
                if (e.photographerId == id && e.image !== undefined) {
                    // console.log(e.id);
                    const newCard = document.createElement("div");
                    newCard.className = "card";
                    newCard.innerHTML = `
                        <img src="images/${e.photographerId}/${e.image}" onclick="openLightbox(this)">
                        <div class="card_text">
                            <div class="price">${e.price} €</div>
                            <div class="likes" onclick="addOne(this)">${e.likes} <i class="fas fa-heart"></i></div>
                        </div>
                    `
                    cardsContainer.append(newCard);
                }
            });

            const modalName = document.querySelector("#modal_name");
            modalName.innerHTML = `${ph.name}`;
        }
    };
};

const addOne = tag => {
    tag.innerHTML++;
    console.log(tag.innerHTML)
}

const openLightbox = tag => {
    console.log(tag)
}

const openFormModal = () => {
    modal.style.display = "block";
}

const closeFormModal = () => {
    modal.style.display = "none";
}

createContent();