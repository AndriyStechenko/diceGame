import {deleteFromStorage, readFromStorage} from './storage.js';
import {setDiceScoreToTurn} from './turnInitialization.js';
import {submitPlayersNameFormModule, playerIsKnown, changeTextInPlayerNameHolder} from './playerNameGetterModule.js';
import {showNewPlayerFormModal} from './playerNameGetterModule.js';
import {initializeScoreTable, showScoreTable, createScoreTable, setPlayerTurnsInfoToScoreTable, createResultTable} from './scoreTableInitialization.js';
import {rollDice} from './actions.js';
import {eraseDicesContainer, drawEmptyDices, makeDiceSectionVisible} from './dicesDrawer.js';
import {showModal, checkedWhatComboAlreadyUsed, makeUsedBtnInCauruselClickeble} from './comboCaruselModule.js';
import {showEndGameModal, hideEndGameModal} from './endGameModule.js';

const startGameBtn = document.getElementById('start-game-btn');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const endRollBtn = document.getElementById('end-turn-btn');
const endGameBtn = document.getElementById('end-game-btn');

function showEndTurnBnt() {
  endRollBtn.classList.toggle('invisible');
}

function showRollDiceBtn() {
  rollDiceBtn.classList.toggle('invisible');
}

function toggleVisebilityStartGameBtn() {
  startGameBtn.classList.toggle('invisible');
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
  // endGameBtn.style.display = '';

  endGameBtn.classList.remove('d-none');
  endGameBtn.classList.add('d-flex');
}

function hideEndGameBtn() {
  endGameBtn.classList.remove('d-flex');
  endGameBtn.classList.add('d-none');
  // endGameBtn.style.display = 'none';
}

function deleteScoreTableFromPage() {
  const scortableElement = document.querySelector('table');
  if (scortableElement) {
    scortableElement.parentNode.removeChild(scortableElement);
  }
}

function endGameBtnActions() {
  toggleVisebilityStartGameBtn();
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
  toggleVisebilityStartGameBtn();
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
    showEndGameModal();
  }
}

function startNewGameActionsFromModal() {
  hideEndGameModal();

  toggleVisebilityStartGameBtn();
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
  toggleVisebilityStartGameBtn();
  hidePlayerNameHolder();
  showEndGameBtn();
  // endGameBtn.click();
  // startGameBtn.click();
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

export {startGameBtnActions, afterSaveNewPlayerActions, afterRollDiceActions, endRollBtnActions, showEndTurnBnt, showRollDiceBtn, makeDiceSectionVisible, prepareScoreTable, createResultTable, showScoreTable, endGameBtnActions, toggleVisebilityStartGameBtn, hideEndGameBtn, showEndGameBtn, startNewGameActionsFromModal};
