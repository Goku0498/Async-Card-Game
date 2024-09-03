//Creating Body Container
let container = document.createElement("div")
container.classList.add("container")

//Creating Title and Header Element
let title = document.createElement("div")
title.classList.add("title")
title.innerHTML = `
<h1 class="header">Card Game</h1>
<p class="para">
Welcome to "Card Game," your go-to destination for exciting and challenging card puzzles! On our site, you can test your skills by matching 3 cards of the same color and shape with continuous numbers (or) cards with the same number but different colors and shapes. Enjoy the thrill of 5 shuffles to help you find the perfect matches. Plus, race against the clock to arrange a full suit with our timer challenge. Dive in for endless fun and sharpen your card-matching abilities!</p>
`
//Creating Radio Buttons for game
let radio_button = document.createElement("div")
radio_button.className = "radio-div"

//Radio Button for 3-set game
let three_set_btn = document.createElement("div")
three_set_btn.classList.add("radio-btn")
three_set_btn.innerHTML = `<label for="Three_set"><input type="radio" class="three_set" name="game_select" value="3-set">3-Set</label>`
radio_button.addEventListener("click", get_card)
radio_button.appendChild(three_set_btn)

//Radio Button for Full-Suit
let full_suit_btn = document.createElement("div")
full_suit_btn.classList.add("radio-btn")
full_suit_btn.innerHTML = `<label for="full_suit"><input type="radio" class="full_suit" name="game_select" value="full_suit">Full Suit</label>`
radio_button.addEventListener("click", get_card)
radio_button.appendChild(full_suit_btn)

let cont1 = document.createElement("div")

function get_card(){
    //Creating Button and adding EventListener
    cont1.innerHTML = `<div class="button-div" onclick="generate()"><button class="button">Get Card</button></div>`    
}


//Creating container to display cards from API
async function generate(){
    cont1.innerHTML = ""
    let api_url = "https://www.deckofcardsapi.com/api/deck/new/draw/?count=5"
    try{
        let info = await get_info(api_url)
        displayCards(info.cards)
    } catch (error){
        console.error(`Failed to get card:${error}`)
    }
}
async function get_info(link){
    let response = await fetch(link);
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    let data = await response.json();
    return data
}

//Function to display fetched cards
function displayCards(cards){
    container.classList.remove("container")
    container.classList.add("container-1")
    title.innerHTML = `<h1 class="header">Card Game</h1>`
    cont1.className = "cont1"
    for(let i=0;i<cards.length;i++){
        let card_image = document.createElement("div")
        card_image.innerHTML = `<img src="${cards[i].image}" class=card-img alt="${cards[i].value} of ${cards[i].suit}" onclick="selected()" /img>`
        cont1.appendChild(card_image)
    }
}

function selected(){
    let cont2= document.createElement("div")
    let game = document.querySelector("input[type=radio]:checked").value
    if(game == "3-set"){
        let count = 0;
        cont2.classList.add("cont-2a")
        var data = document.querySelector(".card-img").alt
        console.log(data)
        data = ""
    }else{
        
    } 
}

container.appendChild(title)
container.appendChild(radio_button)
container.appendChild(cont1)

document.body.append(container)