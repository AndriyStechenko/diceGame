// import { askPlayersName } from "/js/lib/actions.js";
import {createDicesWithDiceValues, drawAllDices} from '/js/modules/dicesDrawer.js'
import {saveToStorage } from "/js/modules/storage.js";
import {initializeTurn} from '/js/modules/turnInitialization.js'
import {submitPlayersNameFromModyle} from '/js/modules/payerNameGetterModal.js'
import {createNewPlayerFromModal} from '/js/modules/payerNameGetterModal.js'

let turn = initializeTurn()

const startGameBtn = document.getElementById("start-game-btn");
const submitBtn = document.getElementById("submitBtn")
const rollDiceBtn = document.getElementById('roll-dice-btn')

function startGameHandler () {
    alert('Play with PC and rool dices')
    function _makeDiceSectionVisible () {
        let diceSectionElement = document.getElementById('dice-section')
        diceSectionElement.classList.toggle("invisible");
    }
    function _makeRollEndBntSectionVisible () {
        let diceSectionElement = document.getElementById('roll-end-bnt-section')
        diceSectionElement.classList.toggle("invisible");
    }
    createNewPlayerFromModal()
    _makeDiceSectionVisible()
    _makeRollEndBntSectionVisible()

}

function rollDice () {
    let dices = createDicesWithDiceValues()
    dices.forEach(dice => { turn.dices.push(dice) });
    drawAllDices(dices)
    saveToStorage("turn", turn)
}

startGameBtn.addEventListener('click', startGameHandler)
submitBtn.addEventListener('click', submitPlayersNameFromModyle)
rollDiceBtn.addEventListener('click', rollDice)