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
    flipCards (...cards) {
        cards.map(card => {
            if (card.classList.contains('back')) {
                //翻回正面
                card.classList.remove('back')
                card.innerHTML = this.getCardContent(Number(card.dataset.index))
                return
            }
            card.classList.add('back')
            card.innerHTML = ''
        })
    },
    pairCards (...cards) {
        cards.map(card => {
            card.classList.add('paired')
        })
    },
    renderScore (score){
        document.querySelector('.score').textContent = `Score: ${score}`
    },
    renderTriedTimes (times){
        document.querySelector('.tried').textContent = `You've tried: ${times} times`
    },
    appendWrongAnimation (...cards) {
        cards.map(card => {
            card.classList.add('wrong')
            card.addEventListener('animationend', event => {
                event.target.classList.remove('wrong')
            },{ once: true })
        })
    },
    showGameFinished (){
        const div = document.createElement('div')
        div.classList.add('completed')
        div.innerHTML = `
        <div class="completed-box">
            <p>Completed!</p>
            <p>Score: ${model.score}</p>
            <p>You've tried: ${model.triedTimes} times</p>
        </div>        
        `
        const body = document.querySelector('body')
        body.before(div)
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
const model = {
    revealedCards: [],
    isRevealedCardsMatched (){
        return this.revealedCards[0].dataset.index % 13 === this.revealedCards[1].dataset.index % 13
    },
    score: 0,
    triedTimes: 0
  }
const controller = {
    currentState: GAME_STATE.FirstCardAwaits,
    generateCards (){
        view.displayCards(utility.getRandomNumberArray(52))
    },
    dispatchCardAction (card) {
        if (!card.classList.contains('back')) return
        switch (this.currentState) {
            case GAME_STATE.FirstCardAwaits:
                this.currentState = GAME_STATE.SecondCardAwaits
                view.flipCards(card)
                model.revealedCards.push(card)
                break
            case GAME_STATE.SecondCardAwaits:
                view.renderTriedTimes(++model.triedTimes)
                view.flipCards(card)
                model.revealedCards.push(card)
                if (model.isRevealedCardsMatched()) {
                    //配對成功
                    view.renderScore(model.score += 10)
                    this.currentState = GAME_STATE.CardsMatched
                    view.pairCards(...model.revealedCards)
                    if (model.score === 260) {
                        view.showGameFinished()
                    }
                    model.revealedCards = []
                    this.currentState = GAME_STATE.FirstCardAwaits
                } else {
                    //配對失敗
                    this.currentState = GAME_STATE.CardsMatchFailed
                    view.appendWrongAnimation(...model.revealedCards)
                    setTimeout(this.resetCards, 1000);
                }
                break
        }
    },
    resetCards (){
        view.flipCards(...model.revealedCards)
        model.revealedCards = []
        controller.currentState = GAME_STATE.FirstCardAwaits
    }
}

controller.generateCards()
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', event => {
        controller.dispatchCardAction(card)
    })
})