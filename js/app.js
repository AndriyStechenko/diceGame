// import { askPlayersName } from "/js/lib/actions.js";
import {createDicesWithDiceValues, drawAllDices} from './modules/dicesDrawer.js'
import {saveToStorage, deleteFromStorage } from "./modules/storage.js";
import {initializeTurn, setPlayersNameToTurn, setDiceScoreToTurn} from './modules/turnInitialization.js'
import {submitPlayersNameFromModyle} from './modules/playerNameGetterModul.js'
import {createNewPlayerFromModal} from './modules/playerNameGetterModul.js'
import {scoreTableResultSum} from './modules/scoreTableInitialization.js'
import { initializeScoreTable, makeScoretableVisible, createScoretable, addPlayersNameToScoreTable, addPlayerScoreToScoreTable, readScoreTable, setPlayerTurnsInfoToScoreTable, createResultTable} from "./modules/scoreTableInitialization.js";

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

function clearDiceContainer() {
    const diceContainer = document.getElementById("dice-container");
    const diceChildren = diceContainer.childNodes;
    
    for (let i = diceChildren.length - 1; i >= 0; i--) {
      diceContainer.removeChild(diceChildren[i]);
    }
}
  
function drawEmptyDices() {
    clearDiceContainer();
  
    const diceContainer = document.getElementById("dice-container");
    for (let i = 0; i < 5; i++) {
      const diceObject = document.createElement("img");
      diceObject.src = "pic/dicePic/dice0.png";
      diceObject.alt = "Dice " + (i + 1);
      diceObject.className = "main_item";
      diceContainer.appendChild(diceObject);
    }
}
  


function startGameHandler () {
    // alert('Play with PC and rool dices')
    createNewPlayerFromModal()
    showRollDiceBtn()
    _makeDiceSectionVisible()
    drawEmptyDices()
    makeScoretableVisible()
    initializeScoreTable()
    showEndTurnBnt()
    createScoretable()
}

function rollDice () {
    let dices = createDicesWithDiceValues()
    turn.clearDices()
    dices.forEach(dice => { turn.dices.push(dice) });
    drawAllDices(dices)
    saveToStorage('currentTurn', turn)
    setPlayersNameToTurn()
}

function afterRollDiceActions () {
    eraseDicesContainer()
    deleteDicesFromMemory()
    rollDice()
    // scoreTableResultSum()
}

function endRollBtnActions () {
    setDiceScoreToTurn()
    addPlayersNameToScoreTable()
    setPlayerTurnsInfoToScoreTable()
    addPlayerScoreToScoreTable()
    createResultTable()
    readScoreTable()
}

startGameBtn.addEventListener('click', startGameHandler)
submitBtn.addEventListener('click', submitPlayersNameFromModyle)
rollDiceBtn.addEventListener('click', afterRollDiceActions)
endRollBtn.addEventListener('click', endRollBtnActions)