import {readFromStorage} from './storage.js';
import {showRollDiceBtn, showEndTurnBnt, makeDiceSectionVisible, createResultTable, showScoreTable, hideStartGameBtn, hideEndGameBtn, showEndGameBtn} from './callbacks.js';
import {drawEmptyDices, drawDicesFromLastTurn, addBacklinghtFromCurrentTurn} from './dicesDrawer.js';

function initializePage() {
  hideEndGameBtn();
  const currentScoreTable = readFromStorage('currentScoreTable');
  if (currentScoreTable) {
    showRollDiceBtn();
    showEndTurnBnt();
    makeDiceSectionVisible();
    drawEmptyDices();
    drawDicesFromLastTurn();
    showScoreTable();
    createResultTable();
    addBacklinghtFromCurrentTurn();
    hideStartGameBtn();
    showEndGameBtn();
  }
}

export {initializePage};
