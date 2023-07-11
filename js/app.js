// import { askPlayersName } from "/js/lib/actions.js";
import {createDicesWithDiceValues, drawAllDices} from './modules/dicesDrawer.js';
import {saveToStorage, deleteFromStorage} from './modules/storage.js';
import {initializeTurn, setPlayersNameToTurn, setDiceScoreToTurn} from './modules/turnInitialization.js';
import {submitPlayersNameFormModule, playerIsKnown} from './modules/playerNameGetterModule.js';
import {showNewPlayerFormModal} from './modules/playerNameGetterModule.js';
import {initializeScoreTable, showScoreTable, createScoreTable, setPlayerTurnsInfoToScoreTable, createResultTable} from './modules/scoreTableInitialization.js';
import {readFromStorage} from './modules/storage.js';

const turn = initializeTurn();

const startGameBtn = document.getElementById('start-game-btn');
const submitBtn = document.getElementById('submitBtn');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const endRollBtn = document.getElementById('end-turn-btn');

function _makeDiceSectionVisible() {
  const diceSectionElement = document.getElementById('dice-section');
  diceSectionElement.classList.toggle('invisible');
}

function showEndTurnBnt() {
  endRollBtn.classList.toggle('invisible');
}

function showRollDiceBtn() {
  rollDiceBtn.classList.toggle('invisible');
}

function eraseDicesContainer() {
  const diceSectionElement = document.getElementById('dice-container');
  diceSectionElement.innerHTML = '';
}

function deleteDicesFromMemory() {
  deleteFromStorage('currentTurn');
}

function clearDiceContainer() {
  const diceContainer = document.getElementById('dice-container');
  const diceChildren = diceContainer.childNodes;

  for (let diceNode = diceChildren.length - 1; diceNode >= 0; diceNode--) {
    diceContainer.removeChild(diceChildren[diceNode]);
  }
}

function drawEmptyDices() {
  clearDiceContainer();

  const diceContainer = document.getElementById('dice-container');
  for (let i = 0; i < 5; i++) {
    const diceObject = document.createElement('img');
    diceObject.src = 'pic/dicePic/dice0.png';
    diceObject.alt = 'Dice ' + (i + 1);
    diceObject.className = 'main_item';
    diceContainer.appendChild(diceObject);
  }
}

function startGameHandler() {
  // alert('Play with PC and rool dices')
  showNewPlayerFormModal();
  showRollDiceBtn();
  showEndTurnBnt();
  _makeDiceSectionVisible();
  drawEmptyDices();
  if (playerIsKnown()) {
    prepareScoreTable();
  }
}

function rollDice() {
  const dices = createDicesWithDiceValues();
  turn.clearDices();
  dices.forEach((dice) => {
    turn.dices.push(dice);
  });
  drawAllDices(dices);
  saveToStorage('currentTurn', turn);
  setPlayersNameToTurn();
}

function afterRollDiceActions() {
  eraseDicesContainer();
  deleteDicesFromMemory();
  rollDice();
}

function endRollBtnActions() {
  setDiceScoreToTurn();
  setPlayerTurnsInfoToScoreTable();
  // addPlayerScoreToScoreTable();
  createResultTable();
  // readScoreTable();
  const currentScoreTable = readFromStorage('currentScoreTable');
  const a = currentScoreTable.firstPlayerTurns.length < 6;
  if (!a) {
    showRollDiceBtn();
    showEndTurnBnt();
  }
}

function afterSaveNewPlayerActions() {
  submitPlayersNameFormModule();
  prepareScoreTable();
}

function prepareScoreTable() {
  const currentScoreTable = initializeScoreTable();
  showScoreTable();
  createScoreTable(currentScoreTable);
}

// function canDoOneMoreTurn() {
//   const currentScoreTable = readFromStorage('currentScoreTable');
//   if (!currentScoreTable) {
//     return true;
//   }
//   const turnsAmount = currentScoreTable.firstPlayerTurns.lenght < 6;
//   return turnsAmount;
// };


startGameBtn.addEventListener('click', startGameHandler);
submitBtn.addEventListener('click', afterSaveNewPlayerActions);
rollDiceBtn.addEventListener('click', afterRollDiceActions);
endRollBtn.addEventListener('click', endRollBtnActions);
