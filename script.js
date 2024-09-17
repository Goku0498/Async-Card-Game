let container = document.createElement("div");
container.classList.add("container");

let title = document.createElement("div");
title.classList.add("title");
title.innerHTML = `
    <h1 class="header">Suit Sprint</h1>
    <p class="para">
    Welcome to Suit Sprint, the ultimate card challenge! Test your speed and strategy as you race against the clock to arrange a full suit of your choice. Sharpen your skills, compete with friends, and see if you can conquer the clock and complete the perfect hand. How fast can you suit up?</p>
`;

let radio_button = document.createElement("div");
radio_button.className = "radio-div";
radio_button.innerHTML = `<div class="radio-btn">
    <label for="full_suit"><input type="radio" class="full_suit" name="game_select" onclick="get_card()" value="full_suit">Full Suit</label>
    </div>`;

let cont1 = document.createElement("div");
let shuffle_btn = document.createElement("div");
let cont2 = document.createElement("div");

function get_card() {
    cont1.innerHTML = `<div class="button-div" onclick="generate()"><button class="button">Get Card</button></div>`;
}

// Function to fetch cards and display them in cont1
async function generate() {
    cont1.innerHTML = "";
    let api_url = "https://www.deckofcardsapi.com/api/deck/new/draw/?count=5";
    try {
        let info = await get_info(api_url);
        displayCards(info.cards);
    } catch (error) {
        console.error(`Failed to get card: ${error}`);
    }
}

async function get_info(link) {
    let response = await fetch(link);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();
    return data;
}

// Function to display fetched cards in cont1
function displayCards(cards) {
    container.classList.remove("container");
    container.classList.add("container-1");
    title.innerHTML = `<h1 class="header">Card Game</h1>`;
    cont1.className = "cont1";
    
    // Display cards in cont1
    for (let i = 0; i < cards.length; i++) {
        let card_image = document.createElement("div");
        let img_link = cards[i].image;
        card_image.innerHTML = `<img src="${img_link}" class="card-img" alt="${cards[i].value} of ${cards[i].suit}" />`;
        card_image.addEventListener('click', () => highlightCard(card_image, cards[i]));
        cont1.appendChild(card_image);
    }
    
    shuffle_btn.innerHTML = `<div class="button-div"><button class="button">Shuffle</button></div>`;
    shuffle_btn.addEventListener('click', () => shuffleCards(cards));
    cont2.classList.add("cont-2a");
    
    // Creating empty slots in cont2
    for (let i = 0; i < 13; i++) {
        let emptySlot = document.createElement("div");
        emptySlot.classList.add("card-slot");
        emptySlot.addEventListener('click', () => selectSlot(emptySlot));
        cont2.appendChild(emptySlot);
    }
}

let selectedCard = null;
let selectedSlot = null;

// Function to highlight and select a card in cont1
function highlightCard(cardElement, cardData) {
    if (selectedCard === cardElement) {
        selectedCard.classList.toggle("highlight");
    } else {
        if (selectedCard) {
            selectedCard.classList.remove("highlight");
        }
        selectedCard = cardElement;
        selectedCard.classList.add("highlight");
    }
}

// Function to select an empty slot in cont2 and move the selected card from cont1 to cont2
function selectSlot(slotElement) {
    if (!selectedCard) return;
    if (!slotElement.innerHTML) {
        slotElement.innerHTML = selectedCard.innerHTML;
        let imgInSlot = slotElement.querySelector('img');
        imgInSlot.style.width = "100%";
        imgInSlot.style.height = "100%";
        imgInSlot.style.objectFit = "cover";
        slotElement.classList.add("highlight-slot");

        imgInSlot.addEventListener('click', () => removeCard(slotElement));

        selectedCard.querySelector('img').src = ""; 
        selectedCard.querySelector('img').alt = "";
        selectedCard.classList.remove("highlight");
        selectedCard = null;
    }
}

// Function to remove a card from cont2
function removeCard(slotElement) {
    slotElement.innerHTML = ""; // Remove the card
    slotElement.classList.remove("highlight-slot"); // Remove highlight from the slot
}

// Function to shuffle the cards in cont1 instantly
async function shuffleCards(cards) {
    for (let i = 0; i < cards.length; i++) {
        let newCard = await get_info('https://www.deckofcardsapi.com/api/deck/new/draw/?count=1');
        const cardImageElement = cont1.children[i].querySelector('img');
        cardImageElement.src = newCard.cards[0].image;
        cardImageElement.alt = `${newCard.cards[0].value} of ${newCard.cards[0].suit}`;
    }
}

// Append elements to the container
container.appendChild(title);
container.appendChild(radio_button);
container.appendChild(cont1);
container.appendChild(shuffle_btn);
container.appendChild(cont2);

document.body.append(container);