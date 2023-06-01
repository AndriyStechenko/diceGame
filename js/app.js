// import { askPlayersName } from "/js/lib/actions.js";
import {createDicesWithDiceValues, drawAllDices} from '/js/modules/dicesDrawer.js'
import {saveToStorage } from "/js/modules/storage.js";
import {initializeTurn} from '/js/modules/turnInitialization.js'
import {submitPlayersNameFromModyle} from '/js/modules/playerNameGetterModul.js'
import {createNewPlayerFromModal} from '/js/modules/playerNameGetterModul.js'
import {scoreTableResultSum} from '/js/modules/scoreTableInitialization.js'
import { initializeScoreTable } from "/js/modules/scoreTableInitialization.js";

let turn = initializeTurn()

const startGameBtn = document.getElementById("start-game-btn");
const submitBtn = document.getElementById("submitBtn")
const rollDiceBtn = document.getElementById('roll-dice-btn')
const endRollBtn = document.getElementById('end-turn-btn')

function _makeDiceSectionVisible () {
    let diceSectionElement = document.getElementById('dice-section')
    console.log(diceSectionElement)
    diceSectionElement.classList.toggle("invisible");
}

function showEndTurnBnt () {
    endRollBtn.classList.toggle("invisible");
}

function showRollDiceBtn () {
    rollDiceBtn.classList.toggle("invisible");
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
    dices.forEach(dice => { turn.dices.push(dice) });
    drawAllDices(dices)
    saveToStorage('currentTurn', turn)
}

function afterRollDiceActions () {
    rollDice()
    scoreTableResultSum()
    showEndTurnBnt()
}

startGameBtn.addEventListener('click', startGameHandler)
submitBtn.addEventListener('click', submitPlayersNameFromModyle)
rollDiceBtn.addEventListener('click', afterRollDiceActions)