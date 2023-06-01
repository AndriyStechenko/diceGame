import Turn from "./turn.js"
import Player from "./player.js"


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
    }

}