export default class Turn {
    constructor () {
        this.number = null
        this.player = null// Player{}
        this.usedCombo = false
        this.dices = [] // Array[] of dices
        this.dicesSum = null
    }

    clearDices () {
        this.dices = [] 
    }

    setPlayerName (name) {
        this.player = name
    }
}