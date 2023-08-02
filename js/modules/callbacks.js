import {deleteFromStorage, readFromStorage} from './storage.js';
import {setDiceScoreToTurn} from './turnInitialization.js';
import {submitPlayersNameFormModule, playerIsKnown} from './playerNameGetterModule.js';
import {showNewPlayerFormModal} from './playerNameGetterModule.js';
import {initializeScoreTable, showScoreTable, createScoreTable, setPlayerTurnsInfoToScoreTable, createResultTable} from './scoreTableInitialization.js';
import {rollDice} from './actions.js';
import {eraseDicesContainer, drawEmptyDices, makeDiceSectionVisible} from './dicesDrawer.js';

const rollDiceBtn = document.getElementById('roll-dice-btn');
const endRollBtn = document.getElementById('end-turn-btn');

function showEndTurnBnt() {
  endRollBtn.classList.toggle('invisible');
}

function showRollDiceBtn() {
  rollDiceBtn.classList.toggle('invisible');
}

function startGameBtnActions() {
  showNewPlayerFormModal();
  const currentScoreTable = readFromStorage('currentScoreTable');
  console.log(currentScoreTable);
  if (currentScoreTable !== null && currentScoreTable.firstPlayerTurns.length < 6) {
    showRollDiceBtn();
    showEndTurnBnt();
  } else {
    console.log('have no turns');
  }

  // if (currentScoreTable.firstPlayerTurns.length < 6) {
  //   showRollDiceBtn();
  //   showEndTurnBnt();
  // } else {
  //   console.log('have no turns');
  // }
  makeDiceSectionVisible();
  drawEmptyDices();
  if (playerIsKnown()) {
    prepareScoreTable();
  }
}

function afterRollDiceActions() {
  eraseDicesContainer();
  deleteFromStorage('currentTurn');
  rollDice();
}

function endRollBtnActions() {
  setDiceScoreToTurn();
  setPlayerTurnsInfoToScoreTable();
  createResultTable();
  const currentScoreTable = readFromStorage('currentScoreTable');
  if (currentScoreTable.firstPlayerTurns.length >= 6) {
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

export {startGameBtnActions, afterSaveNewPlayerActions, afterRollDiceActions, endRollBtnActions, showEndTurnBnt, showRollDiceBtn, makeDiceSectionVisible, prepareScoreTable, createResultTable, showScoreTable};
