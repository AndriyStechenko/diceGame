import Turn from "./turn.js"
import Player from "./player.js"
import { readFromStorage } from "../modules/storage.js"


export default class ScoreTable {
    constructor() {
        this.diceTotal = 1

        this.firstPlayer = new Player
        this.firstPlayerTurns = new Turn
    
        this.secondPlayer = "Computer"
        this.secondPlayerTurns = new Turn 
    
        this.firstPlayerTotal = null
        this.secondPlayerTotal = null

        this.firstPlayerComboUsed = null
        this.secondPlayerComboUsed = null

        this.firstPlayerTurnsHistory = null
        this.secondPlayerTurnsHistory = null
    }

    setPlayerName () {
        this.firstPlayer = readFromStorage('player')
        console.log('players name from class:' ,this.firstPlayer)
    }
}