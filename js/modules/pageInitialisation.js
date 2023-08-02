import {readFromStorage} from './storage.js';
import {showRollDiceBtn, showEndTurnBnt, makeDiceSectionVisible, createResultTable, showScoreTable} from './callbacks.js';
import {drawEmptyDices, drawDicesFromLastTurn, addBacklinghtFromCurrentTurn} from './dicesDrawer.js';

function initializePage() {
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
  }
}

export {initializePage};
