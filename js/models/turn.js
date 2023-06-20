import { readFromStorage } from "../modules/storage.js"

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

    setPlayerName () {
        let playerName = readFromStorage('player')
        this.player = playerName.name
    }
}