// import { askPlayersName } from "/js/lib/actions.js";
import {createDicesWithDiceValues, drawAllDices} from './modules/dicesDrawer.js'
import {saveToStorage, deleteFromStorage } from "./modules/storage.js";
import {initializeTurn} from './modules/turnInitialization.js'
import {submitPlayersNameFromModyle} from './modules/playerNameGetterModul.js'
import {createNewPlayerFromModal} from './modules/playerNameGetterModul.js'
import {scoreTableResultSum} from './modules/scoreTableInitialization.js'
import { initializeScoreTable } from "./modules/scoreTableInitialization.js";

let turn = initializeTurn()

const startGameBtn = document.getElementById("start-game-btn");
const submitBtn = document.getElementById("submitBtn")
const rollDiceBtn = document.getElementById('roll-dice-btn')
const endRollBtn = document.getElementById('end-turn-btn')

function _makeDiceSectionVisible () {
    let diceSectionElement = document.getElementById('dice-section')
    diceSectionElement.classList.toggle("invisible");
}

function showEndTurnBnt () {
    endRollBtn.classList.toggle("invisible");
}

function showRollDiceBtn () {
    rollDiceBtn.classList.toggle("invisible");
}

function eraseDicesContainer () {
    let diceSectionElement = document.getElementById('dice-container')
    diceSectionElement.innerHTML = "";
}

function deleteDicesFromMemory () {
    deleteFromStorage('currentTurn')
}

function startGameHandler () {
    // alert('Play with PC and rool dices')
    createNewPlayerFromModal()
    showRollDiceBtn()
    _makeDiceSectionVisible()
    initializeScoreTable()
}

function rollDice () {
    let dices = createDicesWithDiceValues()
    turn.clearDices()
    dices.forEach(dice => { turn.dices.push(dice) });
    drawAllDices(dices)
    saveToStorage('currentTurn', turn)
}

function afterRollDiceActions () {
    eraseDicesContainer()
    deleteDicesFromMemory()
    rollDice()
    scoreTableResultSum()
    showEndTurnBnt()
}

startGameBtn.addEventListener('click', startGameHandler)
submitBtn.addEventListener('click', submitPlayersNameFromModyle)
rollDiceBtn.addEventListener('click', afterRollDiceActions)