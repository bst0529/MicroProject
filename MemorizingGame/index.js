const GAME_STATE = {
    FirstCardAwaits: "FirstCardAwaits",
    SecondCardAwaits: "SecondCardAwaits",
    CardsMatchFailed: "CardsMatchFailed",
    CardsMatched: "CardsMatched",
    GameFinished: "GameFinished",
}
const Symbos = ['spades.png','hearts.png','diamonds.png','clubs.png']
const view = {
    getCardElement (index){
        return `<div data-index=${index} class="card back"></div>`
    },
    getCardContent (index){
        const number = this.transforNumber(index % 13 + 1)
        const symbo = Symbos[Math.floor(index / 13)]
        return `
        <p>${number}</p>
        <img src="./img/${symbo}">
        <p>${number}</p>
        `
    },
    transforNumber (number){
        switch (number) {
            case 1: return 'A'
            case 11: return 'J'
            case 12: return 'Q'
            case 13: return 'k'
            default: return number
        }
    },
    displayCards (numberArray){
        const rootElement = document.querySelector('#cards')
        rootElement.innerHTML = numberArray
            .map(value => this.getCardElement(value))
            .join('')
    },
    flipCard (card) {
        if (card.classList.contains('back')) {
            //回傳正面
            card.classList.remove('back')
            card.innerHTML = this.getCardContent(Number(card.dataset.index))
            return
        }
        card.classList.add('back')
        card.innerHTML = ''
    }
}
const utility = {
    getRandomNumberArray (count) {
        const numberArray = Array.from(Array(count).keys())
        for (let index = numberArray.length - 1; index >= 0; index--) {
            let randomIndex = Math.floor(Math.random() * (index + 1))
            //解構賦值
            ;[numberArray[index],numberArray[randomIndex]] = [numberArray[randomIndex], numberArray[index]]
        }
        return numberArray
    }
}

const controller = {
    currentState: GAME_STATE.FirstCardAwaits,
    revealedCards: [],
    generateCards (){
        view.displayCards(utility.getRandomNumberArray(52))
    }
}

controller.generateCards()
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', event => {
        view.flipCard(card)
    })
})