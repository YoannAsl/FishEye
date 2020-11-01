const getData = async () => {
    try {
        const res = await axios.get("./data.json");
        return res.data;
    } catch(e) {
        console.log(e);
    }
}

const header = document.querySelector("header");

const createHeader = async () => {
    const data = await getData();
    console.log(data);
}

createHeader();

const cardsContainer = document.querySelector(".cards_container");

const createCards = async () => {
    const data = await getData();
    data.media.forEach(e => {
        // !== undefined pour ne pas afficher les videos
        if (e.photographerId == 243 && e.image !== undefined) {
            // console.log(e.id);
            const newCard = document.createElement("div");
            newCard.className = "card";
            newCard.innerHTML = `
                <img src="images/Mimi/${e.image}">
                <div class="card_text">
                    <div class="price">${e.price} €</div>
                    <div class="likes">${e.likes}</div>
                </div>
            `
            cardsContainer.append(newCard);
        }
    });
}

createCards();

const likes = document.getElementsByClassName(".likes");

const addOne = () => {
    console.log("test")
}

for (let i = 0; i < likes.length; i++) {
    likes[i].addEventListener("click", addOne)
}

addOne();