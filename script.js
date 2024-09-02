let title = document.createElement("div")
title.className = "title"
title.innerHTML = `<div class="header-div">
<h1 class="header">Card Game</h1>
</div>
<div>
<p class="para">
Welcome to "Card Game," your go-to destination for exciting and challenging card puzzles! On our site, you can test your skills by matching 3 or 4 cards of the same color and shape, or cards with the same number but different colors and shapes. Enjoy the thrill of 6 shuffles to help you find the perfect matches. Plus, race against the clock to arrange a full suit with our timer challenge. Dive in for endless fun and sharpen your card-matching abilities!</p>
</div>
`
let button = document.createElement("div")
button.className = "button-div"
button.innerHTML = `<button class="button">Get Card</button>`
button.addEventListener("click", generate)

let cont1 = document.createElement("div")

async function generate(){
    button.innerHTML = ""
    let api_url = "https://www.deckofcardsapi.com/api/deck/new/draw/?count=5"
    try{
        let info = await get_info(api_url)
        console.log(info.cards)
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

function displayCards(cards){
    cont1.className = "cont1"
    for(let i=0;i<cards.length;i++){
        let card_image = document.createElement("div")
        card_image.innerHTML = `<img src="${cards[i].image}" class=card-img alt="${cards[i].value} of ${cards[i].suit}" /img>`
        cont1.appendChild(card_image)
    }
}

let cont2 = document.createElement("div")
cont2.className = "cont2"

document.body.append(title)
document.body.append(button)
document.body.append(cont1)