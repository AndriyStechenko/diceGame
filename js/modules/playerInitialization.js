import Player from "../models/player.js"
import {readFromStorage, saveToStorage} from '../modules/storage.js'

function initializePlayer (name) {
    let existingPlayerObj = readFromStorage('currentPlayer')
    let currentPlayer = new Player
    if (existingPlayerObj) {
        currentPlayer.setName(existingPlayerObj.name) 
        // console.log('existingPlayer:',existingPlayerObj)
    } else {
        currentPlayer.setName(name)
        saveToStorage('currentPlayer', currentPlayer)
        // console.log('currentPlayer:',currentPlayer)
    }

    return currentPlayer
}

export {initializePlayer}