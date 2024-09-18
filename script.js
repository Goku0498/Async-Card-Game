let container = document.createElement("div");
container.classList.add("container");

let title = document.createElement("div");
title.classList.add("title");
title.innerHTML = `
    <h1 class="header">Suit Sprint</h1>
    <p class="para">
    Welcome to Suit Sprint, the ultimate card challenge! Test your speed and strategy as you race against the clock to arrange a full suit of cards. Can you conquer the clock and complete the perfect hand?</p>
`;

//Get Card Button and its funcationality
let getCardButton = document.createElement("div");
getCardButton.className = "button-div";
getCardButton.innerHTML = `<button class="button" onclick="generate()" >Get Card</button>`;


//div tags for cont1, cont2 and shuffle Button
let cont1 = document.createElement("div");
let shuffle_btn = document.createElement("div");
let cont2 = document.createElement("div");


let timerDisplay = document.createElement("div");
timerDisplay.classList.add("timer");
timerDisplay.innerHTML = "Time: 0 sec";

//Variables for timer function
let startTime, timerInterval;
let elapsedTime = 0;
let running = false;
let cardsMoved = 0;

let resetBtn = document.createElement("div");
resetBtn.classList.add("button-div");
resetBtn.innerHTML = `<button class="button" onclick="resetGame()">Reset Game</button>`;

// Function to fetch cards and display them in cont1
async function generate() {
    getCardButton.style.display = "none";
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
    title.innerHTML = `<h3 class="header-1">Suit Sprint</h3>
    <p class="para-1">Hint: The Order is A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K</p>`;
    cont1.className = "cont1";
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
    
    //Method to display empty slots in cont2
    for (let i = 0; i < 13; i++) {
        let emptySlot = document.createElement("div");
        emptySlot.classList.add("card-slot");
        emptySlot.addEventListener('click', () => selectSlot(emptySlot));
        cont2.appendChild(emptySlot);
    }

    container.appendChild(cont1);
    container.appendChild(shuffle_btn);
    container.appendChild(cont2);
    container.appendChild(timerDisplay);
    container.appendChild(resetBtn)
}

let selectedCard = null;
let selectedSlot = null;

// Timer functions
function startTimer() {
    if (!running) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
        running = true;
    }
}

function updateTimer() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.innerHTML = `Time: ${elapsedTime} sec`;
}

function stopTimer() {
    clearInterval(timerInterval);
    running = false;
}

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

        cardsMoved++;
        if (cardsMoved === 1) {
            startTimer();
        }
        if (cardsMoved === 13) {
            stopTimer();
        }
    }
}

// Function to remove a card from cont2
function removeCard(slotElement) {
    slotElement.innerHTML = "";
    slotElement.classList.remove("highlight-slot");
    cardsMoved--;
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

//Creating a Reset
function resetGame() {
    cont2.classList.remove("cont-2a");
    cont1.innerHTML = "";
    cont2.innerHTML = "";
    shuffle_btn.innerHTML = "";
    timerDisplay.innerHTML = "";
    resetBtn.innerHTML = "";
    cardsMoved = 0;
    elapsedTime = 0;
    clearInterval(timerInterval);
    running = false;

    container.classList.remove("container-1");
    container.classList.add("container");
    
    title.innerHTML = `
        <h1 class="header">Suit Sprint</h1>
        <p class="para">
        Welcome to Suit Sprint, the ultimate card challenge! Test your speed and strategy as you race against the clock to arrange a full suit of cards. Can you conquer the clock and complete the perfect hand?</p>
    `;
    getCardButton.style.display = "block";
}


// Append elements to the container
container.appendChild(title);
container.appendChild(getCardButton);
document.body.append(container);
