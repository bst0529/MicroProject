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
        rootElement.innerHTML = this.getCardElement(index)
    }
}
view.displayCards(0)