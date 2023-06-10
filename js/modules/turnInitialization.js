import Turn from "../models/turn.js";
import Player from "../models/player.js"
import {readFromStorage, saveToStorage} from '../modules/storage.js'

function initializeTurn() {
    let existingTurnObj = readFromStorage('turn')
    let currentTurn = new Turn

    if (existingTurnObj) {
        currentTurn.number = existingTurnObj.number

        currentTurn.player = new Player
        if (existingTurnObj.player) {
            currentTurn.player.name = existingTurnObj.player.name
        }

        currentTurn.usedCombo = existingTurnObj.usedCombo

        if (existingTurnObj.dices.length > 0) {
            // перебрать каждый елемент массива existingTurnObj.dices, и прпвратить каждый елемент массива из рбычного обекта в объект класса dice
            currentTurn.dices = existingTurnObj.dices
        }
        
    } else {
        saveToStorage('currentTurn', currentTurn)
    }
    
    return currentTurn
}

export {initializeTurn}