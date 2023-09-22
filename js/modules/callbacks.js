import {deleteFromStorage, readFromStorage} from './storage.js';
import {setDiceScoreToTurn} from './turnInitialization.js';
import {submitPlayersNameFormModule, playerIsKnown, changeTextInPlayerNameHolder} from './playerNameGetterModule.js';
import {showNewPlayerFormModal} from './playerNameGetterModule.js';
import {initializeScoreTable, showScoreTable, createScoreTable, setPlayerTurnsInfoToScoreTable, createResultTable} from './scoreTableInitialization.js';
import {rollDice} from './actions.js';
import {eraseDicesContainer, drawEmptyDices, makeDiceSectionVisible} from './dicesDrawer.js';
import {showModal, checkedWhatComboAlreadyUsed, makeUsedBtnInCauruselClickeble} from './comboCaruselModule.js';

const rollDiceBtn = document.getElementById('roll-dice-btn');
const endRollBtn = document.getElementById('end-turn-btn');
const endGameBtn = document.getElementById('end-game-btn');

function showEndTurnBnt() {
  endRollBtn.classList.toggle('invisible');
}

function showRollDiceBtn() {
  rollDiceBtn.classList.toggle('invisible');
}

function hideStartGameBtn() {
  const startGameBtnSection = document.getElementById('start-game-btn');
  startGameBtnSection.classList.toggle('invisible');
}

function hidePlayerNameHolder() {
  const playerNameHolder = document.getElementById('page-header');
  playerNameHolder.style.display = 'none';
}

function showPlayerNameHolder() {
  const playerNameHolder = document.getElementById('page-header');
  playerNameHolder.style.display = '';
}

function showEndGameBtn() {
  // const endGameBtn = document.getElementById('end-game-btn');
  endGameBtn.style.display = '';
}

function hideEndGameBtn() {
  // const endGameBtn = document.getElementById('end-game-btn');
  endGameBtn.style.display = 'none';
}

function deleteScoreTableFromPage() {
  const scortableElement = document.querySelector('table');
  if (scortableElement) {
    scortableElement.parentNode.removeChild(scortableElement);
  }
}

function showEndGameMessege() {
  alert('End Game');
}

function endGameBtnActions() {
  hideStartGameBtn();
  localStorage.clear();
  makeDiceSectionVisible();
  drawEmptyDices();
  showRollDiceBtn();
  showEndTurnBnt();
  deleteScoreTableFromPage();
  // showScoreTable();
  showPlayerNameHolder();
  changeTextInPlayerNameHolder();
  location.reload();
}

function startGameBtnActions() {
  showNewPlayerFormModal();
  const currentScoreTable = readFromStorage('currentScoreTable');
  if (currentScoreTable && currentScoreTable.firstPlayerTurns.length < 6) {
    showRollDiceBtn();
    showEndTurnBnt();
  } else if (currentScoreTable === null) {
    showRollDiceBtn();
    showEndTurnBnt();
  }
  makeDiceSectionVisible();
  drawEmptyDices();
  if (playerIsKnown()) {
    prepareScoreTable();
  }
  makeUsedBtnInCauruselClickeble();
  hideStartGameBtn();
  hidePlayerNameHolder();
  showEndGameBtn();
}

function afterRollDiceActions() {
  eraseDicesContainer();
  deleteFromStorage('currentTurn');
  rollDice();
  showModal();
  checkedWhatComboAlreadyUsed();
}

function endRollBtnActions() {
  setDiceScoreToTurn();
  setPlayerTurnsInfoToScoreTable();
  createResultTable();
  const currentScoreTable = readFromStorage('currentScoreTable');
  if (currentScoreTable.firstPlayerTurns.length >= 6) {
    showRollDiceBtn();
    showEndTurnBnt();
    showEndGameMessege();
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

export {startGameBtnActions, afterSaveNewPlayerActions, afterRollDiceActions, endRollBtnActions, showEndTurnBnt, showRollDiceBtn, makeDiceSectionVisible, prepareScoreTable, createResultTable, showScoreTable, endGameBtnActions, hideStartGameBtn, hideEndGameBtn, showEndGameBtn};
