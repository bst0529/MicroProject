const Symbos = ['spades.png','hearts.png','diamonds.png','clubs.png']
const view = {
    getCardElement (index){
        const number = this.transforNumber(index % 13 + 1)
        const symbo = Symbos[Math.floor(index / 13)]
        return `
        <div class="card">
            <p>${number}</p>
            <img src="./img/${symbo}">
            <p>${number}</p>
        </div>       
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
    displayCards (index){
        const rootElement = document.querySelector('#cards')
        rootElement.innerHTML = utility.getRandomNumberArray(52)
            .map(value => this.getCardElement(value))
            .join('')
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
view.displayCards(0)