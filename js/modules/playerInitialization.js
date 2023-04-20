import Player from "/js/models/player.js"
import {readFromStorage, saveToStorage} from '/js/modules/storage.js'

function initializePlayer (name) {
    let newPlayer = readFromStorage('player')

    // if (newPlayer) {
    //     newPlayer.name = name
    // } else {
    //     newPlayer = Object.assign(player)
    //     newPlayer.name = name
    //     saveToStorage('player', newPlayer)
    // }

    if (newPlayer) {
        newPlayer.name = name
    } else {
        newPlayer = new Player
        newPlayer.name = name
        saveToStorage('player', newPlayer)
    }


    return newPlayer
}

export {initializePlayer}