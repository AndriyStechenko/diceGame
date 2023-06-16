import Turn from "../models/turn.js";
import Player from "../models/player.js"
import {scoreTableResultSum} from '../modules/scoreTableInitialization.js'
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

function setPlayersNameToTurn () {
    let existingPlayerObj = readFromStorage('player')
    let existingTurnObj = readFromStorage('currentTurn')
    let currentTurn = new Turn
    if (existingTurnObj) {
        currentTurn.dices = existingTurnObj.dices
        currentTurn.setPlayerName(existingPlayerObj.name)
    } else {
        alert('no info')
    }
    saveToStorage('currentTurn', currentTurn)
}

function setDiceScoreToTurn () {
    let existingTurnObj = readFromStorage ('currentTurn')
    let currentTurn = new Turn
    if (existingTurnObj) {
        currentTurn.dices = existingTurnObj.dices
        currentTurn.player = existingTurnObj.player
        currentTurn.dicesSum = scoreTableResultSum()
    } else {
        alert('no info')
    }
    saveToStorage('currentTurn', currentTurn)
}

export {initializeTurn, setPlayersNameToTurn, setDiceScoreToTurn}