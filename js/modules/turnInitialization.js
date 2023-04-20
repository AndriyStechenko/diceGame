import { turn } from "/js/models/turn.js";
import {readFromStorage, saveToStorage} from '/js/modules/storage.js'

function initializeTurn() {
    let newTurn = readFromStorage('turn')
    if (!newTurn ) {
        console.log(turn)
        newTurn = Object.assign(turn)
        console.log(newTurn)
        saveToStorage('turn', newTurn)
    }
    return newTurn
}

export {initializeTurn}