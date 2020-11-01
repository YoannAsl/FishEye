// const test = fetch("./data.json")
//     .then(res => {
//         return res.json()
//     })
//     .then(data => {
//         console.log(data.photographers[0])
//     })
//     .catch(e => {
//         console.log("error", e)
//     });


// axios.get("./data.json")
//     .then(res => {
//         console.log(res.data);
//     })
//     .catch(err => {
//         console.log(err);
//     })

const cardsContainer = document.querySelector(".cards_container");
const tagsContainer = document.querySelector(".tags");

const getData = async () => {
    try {
        const res = await axios.get("./data.json");
        return res.data;
    } catch(e) {
        console.log(e);
    }
}

const createCards = async () => {
    const data = await getData();
    data.photographers.forEach(e => {
        const newCard = document.createElement("div");
        newCard.className = "card";
        newCard.innerHTML = `
            <a href="${new URL(`/id=${e.id}.html`, `${window.location.href}`)}">
                <img src="images/Photographers_ID_Photos/${e.portrait}">
                <h2>${e.name}</h2>
            </a>
            <p class="location">${e.city}, ${e.country}</p>
            <p>${e.tagline}</p>
            <p class="price">${e.price}€/jour</p>
            <div class="tags">
                <a class="tag" href="#"><span>${e.tags[0]}</span></a>
            </div>
        `;
        cardsContainer.append(newCard);
        
        e.tags.map(e => {
            const tagsContainer = document.querySelector(".tags");
            const newTag = document.createElement("a");
            newTag.className = "tag";
            newTag.setAttribute("href", "#");
            newTag.innerHTML = `
                <span>${e}</span>
            `
            tagsContainer.append(newTag);
            // console.log(e)
            // console.log('--------')
        });
        // cardsContainer.append(newCard);
    });
}

createCards();